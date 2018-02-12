const express = require('express')
const app = express()
const path = require('path')
const sassMiddleware = require('node-sass-middleware')
const MobileDetect = require('mobile-detect')


app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.redirect('/cn')
})

app.get('/cn', (req, res) => {
  let langText = require('./lang/cn')
  let md = new MobileDetect(req.headers['user-agent'])  
  if( !md.mobile()  ){
    res.render('desktop/index', { currentLang: 'cn', langText: langText })
  }else{
    res.render('mobile/index', { currentLang: 'cn', langText: langText })
  }
})

app.get('/en', (req, res) => {
  let langText = require('./lang/en')
  let md = new MobileDetect(req.headers['user-agent'])  
  if( !md.mobile()  ){
    res.render('desktop/index', { currentLang: 'en', langText: langText })
  }else{
    res.render('mobile/index', { currentLang: 'en', langText: langText })
  }
})

app.use(
  sassMiddleware({
      src: './asset', 
      dest: './public',
      debug: false,
      outputStyle: 'compressed'
  })
);   


app.use(express.static('public'))
app.use('/images', express.static('images'))

app.use(function(req, res, next){
  res.redirect('/cn')
});




let serverPORT = process.env.PORT || 3000;

app.listen(serverPORT, () => console.log('Example app listening on port ' + serverPORT + '!'))
