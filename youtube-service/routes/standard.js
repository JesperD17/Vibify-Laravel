export default async (req, res) => {
  const query = req.query.type;
  let feed;

  try {
    if (req.query.type === "home") {
      feed = await req.innertube.music.getHomeFeed({});
    } else if (req.query.type === "explore") {
      feed = await req.innertube.music.getExplore({});
    }
  } catch (error) {
    res.status(500).send(error.toString())
  }
  process.visitorData = req.innertube.session.context.client.visitorData;
  res.json(feed);
}