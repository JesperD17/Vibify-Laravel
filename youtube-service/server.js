const express = require('express');
const { Innertube } = require('youtubei.js');

const app = express();
const port = 3000;

var tube;

(async () => {
  tube = await Innertube.create();
})();

app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", '*'); next(); });

async function getContinuationItems(feed, items, maxResults) {
  const results = [];

  if (!feed || !feed.contents) return results;
  let next;

  if (items) {
    do {
      items.contents.forEach(item => results.push(item));

      if (feed.has_continuation) {
        next = await feed.getContinuation();
        items = next.contents;
      } else {
        break;
      }
    } while (feed.has_continuation && results.length < maxResults);
  }

  return results;
}

app.get('/search', async (req, res) => {
  const query = req.query.search_query;
  const maxResults = req.query.search_length;

  // GET /search?search_query=metellica&type=songs
  try {
    let results = [];

    const feed = await tube.music.search(query, {
      type: req.query.type
    });

    if (feed.songs) {
      results = await getContinuationItems(feed, feed.songs, maxResults);
    } else if (feed.videos) {
      results = await getContinuationItems(feed, feed.videos, maxResults);
    } else if (feed.albums) {
      results = await getContinuationItems(feed, feed.albums, maxResults);
    } else if (feed.playlists) {
      results = await getContinuationItems(feed, feed.playlists, maxResults);
    } else if (feed.artists) {
      results = await getContinuationItems(feed, feed.artists, maxResults);
    } else {
      results = ['NO RESULTS FOUND'];
    }

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).send(error.toString());
  }
});

app.get('/standard', async (req, res) => {
  const query = req.query.type;
  let feed;

  if (req.query.type === "home") {
    try {
      feed = await tube.music.getHomeFeed({});
    } catch (error) {
      res.status(500).send(error.toString())
    }
  } else if (req.query.type === "explore") {
    try {
      feed = await tube.music.getExplore({});
    } catch (error) {
      res.status(500).send(error.toString())
    }
  }
  res.json(feed);
});

app.listen(port, () => {
  console.log(`Tube service listening at http://localhost:${port}`);
});