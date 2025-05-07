const express = require('express');
const { Innertube } = require('youtubei.js');

const app = express();
const port = 3000;

var tube;

(async () => {
  tube = await Innertube.create();
})();

app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", '*'); next(); });

app.get('/search', async (req, res) => {
  const query = req.query.search_query;
  const continuation = req.query.continuation;

  try {
    let result;

    // searchFeed = await tube.actions.execute("/search", {
    //   client: "YTMUSIC",
    //   continuation: continuation,
    // });

    // while (searchFeed.continuation) {
    //   searchFeed = await searchFeed.getContinuation();
    // }

    if (!query && !continuation) {
      return res.status(400).send('Query parameter "search_query" is required.');
    }

    if (continuation) {
      result = await tube.music.search('', {
        upload_date: req.query.upload_date,
        sort_by: req.query.sort_by,
        type: "song",
        duration: req.query.duration,
        features: []
      });

      while (result.has_continuation) {
        await result.getContinuation();
        result.songs.forEach(s => { /* process next 20 songs */ });
      }
    } else {
      result = await tube.music.search(query, {
        upload_date: req.query.upload_date,
        sort_by: req.query.sort_by,
        type: "song",
        duration: req.query.duration,
        features: []
      });
    }

    // while (searchFeed.has_continuation) {
    //   await searchFeed.getContinuation();
    // }

    res.json(result);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send(error.toString());
  }
});


app.get('/standard', async (req, res) => {
  let populairFeed;
  try {
    populairFeed = await tube.music.search('any');
  } catch (error) {
    res.status(500).send(error.toString())
  }
  res.json(populairFeed);
});

app.listen(port, () => {
  console.log(`Tube service listening at http://localhost:${port}`);
});