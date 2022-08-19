const token = process.env.NEWS_API_TOKEN;
const adminAuth = require('../../middleware/adminAuth');
const translateID = process.env.TRANSLATE_ID;

const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({ projectId: translateID });
const wiki = require('wikipedia');

router.get('/news', adminAuth, async (req, res) => {
  try {
    const news = await axios.get(
      `https://api.thenewsapi.com/v1/news/top?api_token=${token}&language=en`
    );
    res.json(news.data);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/translate', async (req, res) => {
  try {
    const { title, content, language } = req.body;

    const [translationTitle] = await translate.translate(title, language);
    const [translationDesc] = await translate.translate(content, language);

    const returnItem = { title: translationTitle, content: translationDesc };
    res.json(returnItem);
  } catch (error) {
    console.log(error);
  }
});

router.get('/wiki/random', async (req, res) => {
  try {
    const wikiPage = await axios.get(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions&rvprop=content&grnlimit=1`
    );

    let pageNum;
    for (let x in wikiPage.data.query.pages) {
      pageNum = x;
    }
    const queryTitle = wikiPage.data.query.pages[pageNum].title;

    const article = await wiki.page(queryTitle);
    const content = await article.intro();
    res.json({ content, title: queryTitle });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
