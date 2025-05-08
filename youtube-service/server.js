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
  const maxResults = req.query.search_length;

  // GET /search?search_query=a&search_length=20&type=song&duration=long
  // GET /search?search_query=bla&upload_date=week&sort_by=upload_date
  try {
    let results = [];

    let feed = await tube.music.search(query, {
      upload_date: req.query.upload_date,
      sort_by: req.query.sort_by,
      type: req.query.type,
      duration: req.query.duration,
      features: []
    });
    let songs = feed.songs;
    let next;

    if (songs) {
      do {
        songs.contents.forEach(s => { results.push(s); });
        if (feed.has_continuation) {
          next = await feed.getContinuation();
          songs = next.contents;
        }
      } while (feed.has_continuation && results.length < maxResults);
    } else {
      results = [ 'NO SONGS FOUND' ]
    }

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send(error.toString());
  }
});


app.get('/standard', async (req, res) => {
  let populairFeed;
  try {
    populairFeed = await tube.music.getHomeFeed();
  } catch (error) {
    res.status(500).send(error.toString())
  }
  res.json(populairFeed);
});

app.listen(port, () => {
  console.log(`Tube service listening at http://localhost:${port}`);
});