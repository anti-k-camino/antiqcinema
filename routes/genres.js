const router = require('express').Router();
const Joi = require('@hapi/joi');

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

router.get('/', (req, res) => {
  res.status(200).send(JSON.stringify(genres));
});

router.post('/', (req, res) => {
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

router.get('/:genreID', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.genreID));
  if (!genre) return res.status(404).send('No genre with such id');
  res.status(200).send(JSON.stringify(genre));
});

router.put('/:genreID', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.genreID));
  if (!genre) return res.status(404).send('No genre with such id.');
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(JSON.stringify(result.error.details[0].message));
  genre.name = result.value.name;
  return res.status(200).send(genre);
});

router.delete('/:genreID', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.genreID));
  if (!genre) return res.status(404).send('Not found');
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.status(200).send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(genre);
};

module.exports = router;
