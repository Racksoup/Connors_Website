const token = process.env.NEWS_API_TOKEN;
const adminAuth = require('../../middleware/adminAuth');
const translateID = process.env.TRANSLATE_ID;
const newsApiToken = process.env.NEWS_API_TOKEN;

const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Translate } = require('@google-cloud/translate').v2;
const wiki = require('wikipedia');


const translate = new Translate({ projectId: translateID });

const safeDecode = (value = '') => {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
};

const parseRssItems = (xml = '') => {
  const matches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

  return matches.map((match) => {
    const itemXml = match[1];

    const getTag = (tag) => {
      const tagMatch = itemXml.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i'));
      return tagMatch ? safeDecode(tagMatch[1]) : '';
    };

    return {
      title: getTag('title'),
      url: getTag('link'),
      description: getTag('description'),
      pubDate: getTag('pubDate'),
    };
  });
};

const normalizeRedditPosts = (children = []) => {
  return children.map(({ data }) => ({
    id: data.id,
    source: 'reddit',
    title: data.title,
    url: data.url?.startsWith('http') ? data.url : `https://reddit.com${data.permalink}`,
    permalink: `https://reddit.com${data.permalink}`,
    author: data.author,
    community: data.subreddit,
    score: data.score,
    comments: data.num_comments,
    thumbnail:
      typeof data.thumbnail === 'string' && data.thumbnail.startsWith('http')
        ? data.thumbnail
        : '',
    createdAt: new Date(data.created_utc * 1000).toISOString(),
  }));
};

const normalizeHNItems = (items = []) => {
  return items.map((item) => ({
    id: item.id,
    source: 'hacker-news',
    title: item.title,
    url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
    permalink: `https://news.ycombinator.com/item?id=${item.id}`,
    author: item.by,
    score: item.score,
    comments: item.descendants || 0,
    createdAt: new Date(item.time * 1000).toISOString(),
  }));
};

const normalizeWorldNews = (items = []) => {
  return items.map((item, index) => ({
    id: item.id || item.url || `world-news-${index}`,
    source: 'world-news',
    title: item.title,
    url: item.url,
    permalink: item.url,
    author: item.author || '',
    community: item.source || '',
    description: item.summary || item.text || '',
    image: item.image || '',
    createdAt: item.publish_date || item.publishedAt || '',
  }));
};

const normalizeBlueskyPosts = (posts = []) => {
  return posts.map((post, index) => {
    const author = post.author?.handle || '';
    const uri = post.uri || '';
    const postId = uri.split('/').pop();

    return {
      id: postId || `bsky-${index}`,
      source: 'bluesky',
      title: post.record?.text || '(no text)',
      url:
        author && postId
          ? `https://bsky.app/profile/${author}/post/${postId}`
          : 'https://bsky.app',
      permalink:
        author && postId
          ? `https://bsky.app/profile/${author}/post/${postId}`
          : 'https://bsky.app',
      author,
      score: post.likeCount || 0,
      comments: post.replyCount || 0,
      reposts: post.repostCount || 0,
      createdAt: post.indexedAt || '',
    };
  });
};

router.get('/feed/:source', async (req, res) => {
  const { source } = req.params;

  try {
    if (source === 'reddit') {
      const subreddit = req.query.subreddit || 'news';
      const sort = req.query.sort || 'top';
      const t = req.query.t || 'day';
      const limit = Number(req.query.limit || 20);

      const redditUrl =
        sort === 'top'
          ? `https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}&t=${t}`
          : `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}`;

      const response = await axios.get(redditUrl, {
        headers: {
          'User-Agent': 'ConnorsWebsite/1.0',
        },
      });

      return res.json({
        source: 'reddit',
        items: normalizeRedditPosts(response.data?.data?.children || []),
      });
    }

    if (source === 'hacker-news') {
      const idsResponse = await axios.get(
        'https://hacker-news.firebaseio.com/v0/topstories.json'
      );

      const ids = (idsResponse.data || []).slice(0, 20);

      const itemResponses = await Promise.all(
        ids.map((id) =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        )
      );

      return res.json({
        source: 'hacker-news',
        items: normalizeHNItems(itemResponses.map((item) => item.data).filter(Boolean)),
      });
    }

    if (source === 'world-news') {
      const response = await axios.get('https://api.worldnewsapi.com/top-news', {
        params: {
          'source-country': req.query.country || 'ca',
          language: 'en',
        },
        headers: {
          'x-api-key': process.env.WORLD_NEWS_API_KEY,
        },
      });

      return res.json({
        source: 'world-news',
        items: normalizeWorldNews(response.data?.top_news || response.data?.news || []),
      });
    }

    if (source === 'google-trends') {
      const geo = req.query.geo || 'US';

      // This is the old RSS endpoint. It still works in many setups.
      // If Google blocks it in your environment, the frontend will show the error.
      const response = await axios.get(
        `https://trends.google.com/trending/rss?geo=${geo}`
      );

      const items = parseRssItems(response.data).map((item, index) => ({
        id: `google-trends-${index}`,
        source: 'google-trends',
        title: item.title,
        url: item.url,
        permalink: item.url,
        description: item.description,
        createdAt: item.pubDate,
      }));

      return res.json({
        source: 'google-trends',
        items,
      });
    }

    if (source === 'bluesky') {
      const q = req.query.q || 'news';
      const limit = Number(req.query.limit || 20);

      const response = await axios.get(
        'https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts',
        {
          params: {
            q,
            limit,
            sort: 'top',
          },
        }
      );

      return res.json({
        source: 'bluesky',
        items: normalizeBlueskyPosts(response.data?.posts || []),
      });
    }

    if (source === 'twitter') {
      return res.status(501).json({
        source: 'twitter',
        items: [],
        message: 'X/Twitter trends are not wired yet. This route needs X API credentials.',
      });
    }

    return res.status(404).json({ error: 'Unknown source.' });
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message || 'Request failed.',
    });
  }
});

router.get('/news', async (req, res) => {
  try {
    const news = await axios.get(
      `https://api.thenewsapi.com/v1/news/top?api_token=${newsApiToken}&language=en`
    );
    res.json(news.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/translate', async (req, res) => {
  try {
    const { title, content, language } = req.body;
    const [translationTitle] = await translate.translate(title, language);
    const [translationDesc] = await translate.translate(content, language);

    res.json({
      title: translationTitle,
      content: translationDesc,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/wiki/random', async (req, res) => {
  try {
    const wikiPage = await axios.get(
      'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions&rvprop=content&grnlimit=1'
    );

    let pageNum;
    for (const x in wikiPage.data.query.pages) {
      pageNum = x;
    }

    const queryTitle = wikiPage.data.query.pages[pageNum].title;
    const article = await wiki.page(queryTitle);
    const content = await article.intro();

    res.json({ content, title: queryTitle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
