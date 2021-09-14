const e = require('express');
const express = require('express');
const { killDaemon } = require('pm2');
const app = express()
const port = 3030;

const generateUsers = require('./lib/data');

app.use(express.urlencoded({extended:true}));
app.use(express.json())

// Serve static html/js/css content publically
app.use(express.static('www'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let data = [];
let me = {};

app.post('/start', (req, res) => {
  console.log( req.body );
  data = generateUsers();
  res.send(data);
})

app.get('/see', (req, res) => {

  if( data.length > 0 )
  {
    res.send( data[data.length-1] );  
  }
  else res.send({});

});

app.get('/no', (req, res) => {
  data.pop();
  res.send({});
});

app.get('/trymatch', (req, res) => {
  let card = data.pop();
  console.log(me);
  console.log(card);
  if( (card.language == me.language && card.match == true) ||
      card.luck == true ) {

    let email = Math.random().toString(36).substring(2);
    res.send({match: true, email: `${email}@ncsu.edu` });
  }
  else res.send({match: false });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})