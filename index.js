const express = require('express');
const app = express();

const fs = require('fs');

const jsonFilePath = 'test.json';

app.use(express.static('src'));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/src/index.html');
});

app.get('/json', (req, res) => {
  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
  res.json(jsonData);
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});