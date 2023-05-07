const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let count = 0;

app.get('/api/count', (req, res) => {
  res.json({ count: count });
});

app.post('/api/count', (req, res) => {
  count++;
  res.json({ count: count });
});



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
