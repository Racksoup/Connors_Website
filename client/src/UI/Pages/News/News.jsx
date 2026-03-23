import React, { useEffect, useMemo, useState } from 'react';
import './News.scss';

const SOURCE_CONFIG = {
  'google-trends': {
    label: 'Google Trends',
    buildUrl: () => '/api/news/feed/google-trends?geo=US',
  },
  bluesky: {
    label: 'Bluesky',
    buildUrl: () => '/api/news/feed/bluesky?q=news',
  },
  twitter: {
    label: 'Twitter/X',
    buildUrl: () => '/api/news/feed/twitter',
  },
  reddit: {
    label: 'Reddit',
    buildUrl: (subTab) => {
      const subredditMap = {
        news: 'news',
        worldnews: 'worldnews',
        technology: 'technology',
        top: 'popular',
      };

      const subreddit = subredditMap[subTab] || 'news';
      return `/api/news/feed/reddit?subreddit=${subreddit}&sort=top&t=day`;
    },
  },
  'world-news': {
    label: 'Top News',
    buildUrl: () => '/api/news/feed/world-news?country=ca',
  },
  'hacker-news': {
    label: 'Hacker News',
    buildUrl: () => '/api/news/feed/hacker-news',
  },
};

const REDDIT_SUB_TABS = [
  { key: 'news', label: 'r/news' },
  { key: 'worldnews', label: 'r/worldnews' },
  { key: 'technology', label: 'r/technology' },
  { key: 'top', label: 'Top' },
];

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString();
};

const News = () => {
  const [activeSource, setActiveSource] = useState('google-trends');
  const [redditSubTab, setRedditSubTab] = useState('news');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchUrl = useMemo(() => {
    const source = SOURCE_CONFIG[activeSource];
    return source.buildUrl(redditSubTab);
  }, [activeSource, redditSubTab]);

  const loadFeed = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(fetchUrl);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || data?.error || 'Failed to load feed.');
      }

      setItems(data.items || []);
      setMessage(data.message || '');
    } catch (err) {
      setItems([]);
      setError(err.message || 'Failed to load feed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, [fetchUrl]);

  return (
    <div className='News'>

      

      {activeSource === 'reddit' && (
        <div className='sub_tabs'>
          {REDDIT_SUB_TABS.map((tab) => (
            <button
              key={tab.key}
              className={redditSubTab === tab.key ? 'tab active' : 'tab'}
              onClick={() => setRedditSubTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {loading && <div className='status_box'>Loading…</div>}
      {error && <div className='status_box error'>{error}</div>}
      {message && !error && <div className='status_box'>{message}</div>}

      <div className='news_list'>
        {!loading && !error && items.length === 0 && (
          <div className='status_box'>No stories returned.</div>
        )}

        {items.map((item) => (
          <a
            key={item.id || item.url}
            className='news_card'
            href={item.url}
            target='_blank'
            rel='noreferrer'
          >
            <div className='news_card_top'>
              <span className='source_badge'>{item.source}</span>
              {item.community && <span className='meta'>{item.community}</span>}
            </div>

            <h3>{item.title}</h3>

            {item.description && <p>{item.description}</p>}

            <div className='news_card_bottom'>
              {item.author && <span>{item.author}</span>}
              {typeof item.score === 'number' && <span>Score: {item.score}</span>}
              {typeof item.comments === 'number' && <span>Comments: {item.comments}</span>}
              {item.createdAt && <span>{formatDate(item.createdAt)}</span>}
            </div>
          </a>
        ))}
      </div>

      <div className='source_tabs'>
        {Object.entries(SOURCE_CONFIG).map(([key, source]) => (
          <button
            key={key}
            className={activeSource === key ? 'tab active' : 'tab'}
            onClick={() => setActiveSource(key)}
          >
            {source.label}
          </button>
        ))}
      </div>

      {activeSource === 'reddit' && (
        <div className='sub_tabs'>
          {REDDIT_SUB_TABS.map((tab) => (
            <button
              key={tab.key}
              className={redditSubTab === tab.key ? 'tab active' : 'tab'}
              onClick={() => setRedditSubTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
