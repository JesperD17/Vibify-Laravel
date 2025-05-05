const express = require('express');
const { Innertube } = require('youtubei.js');

const app = express();
const port = 3000;

let tube;

(async () => {
  tube = await Innertube.create();
})();

app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", '*'); next(); });

app.get('/results', async (req, res) => {
  const query = req.query.search_query;
  const continuation = req.query.continuation;

  // GET /search?q=bla&upload_date=week&sort_by=upload_date
  if (continuation) {
    try {
      let continuationFeed = await tube.music.ContinuationRequest(continuation);
      res.json(continuationFeed);
    } catch (error) {
      res.status(500).send(error.toString())
    }
  } else {
    try {
      if (!query || !continuation) return res.status(400).send('Query parameter "search_query" or "continuation" is required.');

      let searchFeed = await tube.music.search(
        query,
        {
          upload_date: req.query.upload_date,
          sort_by: req.query.sort_by,
          type: "song",
          duration: req.query.duration,
          features: []
        }
      );
      res.json(searchFeed);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  }
});

app.listen(port, () => {
  console.log(`Tube service listening at http://localhost:${port}`);
});