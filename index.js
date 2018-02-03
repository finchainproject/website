const express = require('express')
const app = express()


/* wordings */ 
// const langCN = require('./lang/cn')

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.redirect('/cn')
})

app.get('/cn', (req, res) => {
  let langText = require('./lang/cn')
  res.render('index', { currentLang: 'cn', langText: langText })
})

app.get('/en', (req, res) => {
  let langText = require('./lang/en')
  res.render('index', { currentLang: 'en', langText: langText })
})

app.use(express.static('public'))
app.use('/images', express.static('images'))

app.use(function(req, res, next){
  res.redirect('/cn')
});

let serverPORT = process.env.PORT || 3000;

app.listen(serverPORT, () => console.log('Example app listening on port ' + serverPORT + '!'))
