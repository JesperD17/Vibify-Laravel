export default async (req, res) => {
  const id = req.query.id;
  const audioType = req.query.type;
  const songData = req.query.songData;
  let info;

  try {
    if (id) {
      info = await req.innertube.getStreamingData(id, audioType);
    } else if (songData) {
      info = await req.innertube.getBasicInfo(songData, 'YTMUSIC');
    }
  } catch (error) {
    res.status(500).send(error.toString())
  }
  process.visitorData = req.innertube.session.context.client.visitorData;
  res.json(info)
}