const express = require('express');
const app = express();

const port = 3000

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/dist'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`App running on port ${port} :)`);
});