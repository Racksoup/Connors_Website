const token = process.env.NEWS_API_TOKEN;
const adminAuth = require('../../middleware/adminAuth');
const translateID = process.env.TRANSLATE_ID;

const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({ projectId: translateID });
const wiki = require('wikipedia');

router.get('/fr', adminAuth, async (req, res) => {
  try {
    const news = await axios.get(
      `https://api.thenewsapi.com/v1/news/top?api_token=${token}&language=fr`
    );
    res.json(news.data);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/en', async (req, res) => {
  try {
    const { title, description } = req.body;
    const target = 'en';

    const [translationTitle] = await translate.translate(title, target);
    const [translationDesc] = await translate.translate(description, target);

    const returnItem = { title: translationTitle, description: translationDesc };
    res.json(returnItem);
  } catch (error) {
    console.log(error);
  }
});

router.get('/wiki/random', adminAuth, async (req, res) => {
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
    const content = await article.content();
    console.log(content);
    res.json(content);
  } catch (error) {
    console.log(error.message);
  }
});

// router.get('/wiki/random', adminAuth, async (req, res) => {
//   try {
//     const wikiPage = await axios.get(
//       `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&rvslots=*&grnnamespace=0&prop=revisions&rvprop=content&grnlimit=1`
//     );
//     res.json(article.data);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

module.exports = router;
