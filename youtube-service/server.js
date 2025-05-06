const express = require('express');
const { Innertube } = require('youtubei.js');

const app = express();
const port = 3000;

let tube;

(async () => {
  tube = await Innertube.create();
})();

app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", '*'); next(); });

app.get('/search', async (req, res) => {
  const query = req.query.search_query;
  const continuation = req.query.continuation;

  try {
    let searchFeed;

    if (continuation) {
      // searchFeed = await tube.actions.execute("/search", {
      //   client: "YTMUSIC",
      //   continuation: continuation,
      // });

      let searchFeed = await tube.music.search(query);
      searchFeed.songs.forEach(s => { /* process 20 songs */ })

      while (searchFeed.continuation) {
        await searchFeed.getContinuation();
        searchFeed.songs.forEach(s => { /* process next 20 songs */ });
      }

    } else {
      // New search
      if (!query) {
        return res.status(400).send('Query parameter "search_query" is required.');
      }

      searchFeed = await tube.music.search(query, {
        upload_date: req.query.upload_date,
        sort_by: req.query.sort_by,
        type: "song",
        duration: req.query.duration,
        features: []
      });
    }

    res.json(searchFeed);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send(error.toString());
  }
});


// app.get('/standard', async (req, res) => {
//   try {
//     let populairFeed = await tube.music.
//   } catch (error) {
//     res.status(500).send(error.toString())
//   }
// });

app.listen(port, () => {
  console.log(`Tube service listening at http://localhost:${port}`);
});