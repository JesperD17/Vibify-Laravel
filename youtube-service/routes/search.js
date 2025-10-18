import Utils from '../utils/index.js';

export default async (req, res) => {
  const query = req.query.search_query;
  const maxResults = req.query.search_length;
  let results = [];

  // GET /search?search_query=metellica&type=songs
  try {
    const feed = await req.innertube.music.search(query, {
      type: req.query.type
    });

    if (feed.songs) {
      results = await Utils.GetContinuationItems(feed, feed.songs, maxResults);
    } else if (feed.videos) {
      results = await Utils.GetContinuationItems(feed, feed.videos, maxResults);
    } else if (feed.albums) {
      results = await Utils.GetContinuationItems(feed, feed.albums, maxResults);
    } else if (feed.playlists) {
      results = await Utils.GetContinuationItems(feed, feed.playlists, maxResults);
    } else if (feed.artists) {
      results = await Utils.GetContinuationItems(feed, feed.artists, maxResults);
    } else {
      results = ['NO RESULTS FOUND'];
    }

    res.json(results);
  } catch (error) {
    res.status(500).send(error.toString());
  }
  process.visitorData = req.innertube.session.context.client.visitorData;
}