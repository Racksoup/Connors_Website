const token = process.env.NEWS_API_TOKEN;
const adminAuth = require('../../middleware/adminAuth');
const translateID = process.env.TRANSLATE_ID;

const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({ projectId: translateID });

router.get('/', adminAuth, async (req, res) => {
  try {
    const news = await axios.get(
      `https://api.thenewsapi.com/v1/news/top?api_token=${token}&language=fr`
    );
    res.json(news.data);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/en', async (req, res) => {
  try {
    const { text } = req.body;
    const target = 'en';

    const [translation] = await translate.translate(text, target);

    res.json(translation);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
