const express = require('express');
const Joi = require('@hapi/joi');
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

app.post('/api/genres', (req, res) => {
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(JSON.stringify(result.error.details[0].message));
  const genre = {
    id: genres.length + 1,
    name: result.value.name
  };
  genres.push(genre);
  res.status(200).send(genre);
});

app.get('/api/genres/:genreID', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.genreID));
  if (!genre) return res.status(404).send('No genre with such id');
  res.status(200).send(JSON.stringify(genre));
});

app.put('/api/genres/:genreID', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.genreID));
  if (!genre) return res.status(404).send('No genre with such id.');
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(JSON.stringify(result.error.details[0].message));
  genre.name = result.value.name;
  return res.status(200).send(genre);
});

app.delete('/api/genres/:genreID', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.genreID));
  if (!genre) return res.status(404).send('Not found');
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.status(200).send(genre);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateGenre(genre) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(genre);
};
