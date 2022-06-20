export default async (req, res) => {
  if (!req.query.todo) {
    return res.status(400).send('todo parameter required.');
  }
  let todo = encodeURI(req.query.todo);

  const token =
    'AZIuASQgNTc5NjE4MzMtM2E2Ny00MWM0LWJjODUtMzQ4Yjk0ODRjYWQ3YjhjZGNlOTY4YTFkNDA3MWJlMDQ4NmMyM2VmYzAyM2I=';
  const url =
    'https://us1-frank-skylark-37422.upstash.io/lrem/todo/1/' +
    todo +
    '?_token=' +
    token;

  return fetch(url)
    .then((r) => r.json())
    .then((data) => {
      let result = JSON.stringify(data.result);
      return res.status(200).json(result);
    });
};
