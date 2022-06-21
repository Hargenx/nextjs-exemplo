export default async (req, res) => {
  const token =
    'SEU_TOKEN';
  const url =
    'https://ENDPOINT/lrange/todo/0/100?_token=' +
    token;

  return fetch(url)
    .then((r) => r.json())
    .then((data) => {
      let result = JSON.stringify(data.result);
      return res.status(200).json(result);
    });
};
