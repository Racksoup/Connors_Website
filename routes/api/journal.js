const JournalPost = require('../../models/JournalPost');
const Auth = require('../../middleware/adminAuth');

const express = require('express');
const router = express.Router();
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');
const db = process.env.MONGOURI;

// ========================
// DATABASE STORAGE METHOD
// ========================
// Create storage engine
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'journalImages',
          //metadata: req.body,
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
// Create a new mongodb connection and once connected save GridFSBucket 'journalImages' to journalBucket
const connect = mongoose.createConnection(db);
let journalBucket;
connect.once('open', () => {
  journalBucket = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'journalImages',
  });
});
// ========================
// DATABASE STORAGE METHOD
// ========================

// Create Journal Post
router.post('/', [Auth, upload.single('file')], async (req, res) => {
  const { title, text, date } = req.body;

  const postItem = {};
  if (title) postItem.title = title;
  if (text) postItem.text = text;
  if (date) postItem.date = date;
  if (req.file) {
    postItem.image_filename = req.file.filename;
  }

  try {
    const item = new JournalPost(postItem);
    await item.save();
    res.json({
      item: item,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update Journal Entry
router.put('/:_id', Auth, async (req, res) => {
  const { title, date, text, image_filename } = req.body;
  const postItem = {};
  if (title) postItem.title = title;
  if (text) postItem.text = text;
  if (date) postItem.date = date;
  if (image_filename) postItem.image_filename = image_filename;

  try {
    const item = await JournalPost.findOneAndUpdate({ _id: req.params._id }, postItem);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete Journal Entry
router.delete('/:_id', Auth, async (req, res) => {
  try {
    await JournalPost.findOneAndRemove({ _id: req.params._id });
    gfs.remove({ _id: req.params._id, root: 'journalImages' }, (err, GridFSBucket) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    });
    res.json({ msg: 'Journal Entry Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get All Journal Entries
router.get('/', Auth, async (req, res) => {
  try {
    const items = await JournalPost.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get One Journal Entry
router.get('/:_id', Auth, async (req, res) => {
  try {
    const item = await JournalPost.findById(req.params._id);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get One Journal Entry By Date
router.get('/date/:date', Auth, async (req, res) => {
  try {
    const item = await JournalPost.findOne({ date: req.params.date });
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  Get Journal Entries By Month, 3 months of data (prevMonth, currMonth, nextMonth)
router.get('/month/:year/:month', Auth, async (req, res) => {
  try {
    let nextMonth = parseInt(req.params.month) + 1;
    if (nextMonth < 10) {
      nextMonth = `0${nextMonth + 1}`;
    }
    let prevMonth = parseInt(req.params.month) - 1;
    if (prevMonth === -1) {
      prevMonth = 11;
    } else if (prevMonth < 10) {
      prevMonth = `0${prevMonth}`;
    }
    const items = await JournalPost.find({
      date: {
        $gte: new Date(req.params.year, prevMonth),
        $lt: new Date(req.params.year, nextMonth),
      },
    });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error x');
  }
});

// ===========================
// IMAGE ROUTES
// ===========================

// Get Journal Image
router.get('/image/:filename', async (req, res) => {
  await gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if files
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No Files Exist',
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not jpeg or pgn Image',
      });
    }
  });
});

module.exports = router;
