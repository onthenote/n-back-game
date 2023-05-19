const express = require('express');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
var cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let count = 0;

readFile('./count.txt', 'utf8')
.then(data => {
  count = parseInt(data);
  console.log(`count: ${count}`);
})
.catch(err => {
  console.error(err);
});

app.get('/api/count', async (req, res) => {
  try {
    const data = await readFile('./count.txt', 'utf8');
    const count = parseInt(data);
    res.json({ count: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.post('/api/count', (req, res) => {
  count++;
  writeFile('./count.txt', count.toString(), 'utf8')
  .then(data => {
    res.json({ count: count });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: err });
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
