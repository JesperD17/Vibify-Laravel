export default async (req, res) => {
  if (!req.query.url)
    return res.status(400).send({ error: 'Missing ?url' });

  const url = req.query.url;
  const Url = new URL(url);

  // Do NOT forward browser headers. Only send what YouTube actually expects from WEB client
  const headers = {
    range: req.headers.range,
    // critical: EXACT same UA YouTube expects (must match your Innertube client_type)
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Mobile/15E148 Safari/604.1',
    origin: 'https://www.youtube.com',
    referer: 'https://www.youtube.com/',
    host: Url.host,
    connection: 'keep-alive'
  };

  try {
    const response = await fetch(url, { headers });

    console.log('YT STATUS:', response.status);
console.log('YT HEADERS:', Object.fromEntries(response.headers));


    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.setHeader('Access-Control-Allow-Origin', '*');

    response.body.pipeTo(
      new WritableStream({
        write(chunk) { res.write(chunk); },
        close() { res.end(); }
      })
    );
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
