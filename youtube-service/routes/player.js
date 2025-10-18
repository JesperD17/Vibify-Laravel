import Utils from '../utils/index.js';

export default async (req, res) => {
  const id = req.query.id;
  let info;
  let poToken;

  try {
    info = await req.innertube.getInfo(id, { client: 'MWEB' });
  } catch (error) {
    return res.status(500).send(error.toString());
  }

  info = await info.toDash({
    url_transformer: url => {
      url = new URL(url);
      url.searchParams.set('pot', req.innertube.session.po_token);
      return `http://localhost:3000/proxy?url=${encodeURIComponent(url)}`;
    } 
  });
  process.visitorData = req.innertube.session.context.client.visitorData;

  res.send(info);
}