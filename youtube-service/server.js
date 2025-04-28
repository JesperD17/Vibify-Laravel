const express = require('express');
const { Innertube } = require('youtubei.js');

const app = express();
const port = 3000;

let youtube;

(async () => {
  youtube = await Innertube.create();
})();

app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).send('Query parameter "q" is required.');

  try {
    const searchResults = await youtube.search(query);
    res.json(searchResults);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`YouTube service listening at http://localhost:${port}`);
});