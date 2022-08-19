const token = process.env.NEWS_API_TOKEN;
const adminAuth = require('../../middleware/adminAuth');
const translateID = process.env.TRANSLATE_ID;

const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({ projectId: translateID });

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

module.exports = router;
