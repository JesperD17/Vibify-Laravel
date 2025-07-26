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
  let results = [];

  // GET /search?search_query=metellica&type=songs
  try {
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
    res.status(500).send(error.toString());
  }
});

app.get('/standard', async (req, res) => {
  const query = req.query.type;
  let feed;

  try {
    if (req.query.type === "home") {
      feed = await tube.music.getHomeFeed({});
    } else if (req.query.type === "explore") {
      feed = await tube.music.getExplore({});
    }
  } catch (error) {
    res.status(500).send(error.toString())
  }
  res.json(feed);
});

app.get('/streamingData', async (req, res) => {
  const id = req.query.id;
  const audioType = req.query.type;
  const songData = req.query.songData;
  let info;

  try {
    if (id) {
      info = await tube.getStreamingData(id, audioType);
    } else if (songData) {
      info = await tube.getBasicInfo(songData, 'YTMUSIC');
    }
  } catch (error) {
    res.status(500).send(error.toString())
  }
  res.json(info)
})

app.get('/player', async (req, res) => {
  const id = req.query.id;
  const audioType = req.query.type;
  const songData = req.query.songData;
  let info;

  try {
    info = await tube.getInfo(id, "YTMUSIC");
  } catch (error) {
    res.status(500).send(error.toString())
  }
  res.send(await info.toDash(url => {
    return `http://localhost:3000/proxy?url=${encodeURIComponent(url)}`;
  }));
})

app.listen(port, () => {
  console.log(`Tube service listening at http://localhost:${port}`);
});

// playing songs using proxy
app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  const Url = new URL(targetUrl);

  const headers = {
    ...req.headers,
    origin: 'https://www.youtube.com',
    referer: 'https://www.youtube.com/',
    cookie: null,
    host: Url.host
  };

  const response = await fetch(targetUrl, { headers });

  const body = await response.arrayBuffer();
  for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(response.status).send(Buffer.from(body));
});