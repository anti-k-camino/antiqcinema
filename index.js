const express = require('express');
const genres = require('./routes/genres');
const app = express();

app.use(express.json()); // 'application/json' parser
app.use('/api/genres', genres);

const port = process.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
