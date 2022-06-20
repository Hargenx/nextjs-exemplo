export default async (req, res) => {
  const token =
    'AZIuASQgNTc5NjE4MzMtM2E2Ny00MWM0LWJjODUtMzQ4Yjk0ODRjYWQ3YjhjZGNlOTY4YTFkNDA3MWJlMDQ4NmMyM2VmYzAyM2I=';
  const url =
    'https://us1-frank-skylark-37422.upstash.io/lrange/todo/0/100?_token=' +
    token;

  return fetch(url)
    .then((r) => r.json())
    .then((data) => {
      let result = JSON.stringify(data.result);
      return res.status(200).json(result);
    });
};
