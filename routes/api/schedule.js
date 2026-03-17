const adminAuth = require('../../middleware/adminAuth');
const ScheduleTask = require('../../models/ScheduleTask');

const express = require('express');
const router = express.Router();

// get all tasks from one date
router.get('/tasks/:date1/:date2', adminAuth, async (req, res) => {
  const date1 = new Date(req.params.date1);
  const date2 = new Date(req.params.date2);

  try {
    const tasks = await ScheduleTask.find({
      date: {
        $gte: date1,
        $lte: date2,
      },
    });
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
});

// get all tasks
router.get('/tasks', adminAuth, async (req, res) => {
  try {
    const tasks = await ScheduleTask.find();
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// get one task
router.get('/task/:id', adminAuth, async (req, res) => {
  try {
    const task = await ScheduleTask.findOne({ _id: req.params.id });
    res.json(task);
  } catch (error) {
    console.log(error);
  }
});

// post task
router.post('/', adminAuth, async (req, res) => {
  const { date, task, start_time, end_time } = req.body;
  const postItem = {
    task  
  };
  if (date) postItem.date = date;
  if (start_time) postItem.start_time = start_time;
  if (end_time) postItem.end_time = end_time;

  try {
    const item = new ScheduleTask(postItem);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// put task
router.put('/', adminAuth, async (req, res) => {
  const { date, task, _id } = req.body;
  const postItem = {};
  postItem.date = date;
  postItem.task = task;
  postItem._id = _id;

  try {
    const item = await ScheduleTask.findOneAndUpdate({ _id }, postItem, {
      returnDocument: 'after',
    });
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// delete task
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const item = await ScheduleTask.findOneAndDelete({ _id: req.params.id });
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
