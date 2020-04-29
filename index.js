const express = require('express');
const app = express();
app.use(express.json()); // 'application/json' parser

const port = process.PORT || 3000;
const genres = [
  {
    id: 1,
    name: 'genre1'
  },
  {
    id: 2,
    name: 'genre2'
  },
  {
    id: 3,
    name: 'genre3'
  }
];

app.get('/api/genres', (req, res) => {
  res.status(200).send(JSON.stringify(genres));
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
