const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extend: false }));

// routes
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/lists', require('./routes/api/lists'));
app.use('/api/listItem', require('./routes/api/listItem'));
app.use('/api/weather', require('./routes/api/weather'));
app.use('/api/journal', require('./routes/api/journal'));
app.use('/api/news', require('./routes/api/news'));
app.use('/api/schedule', require('./routes/api/schedule'));

// production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
