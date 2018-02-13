const express = require('express')
const app = express()
const path = require('path')
const sassMiddleware = require('node-sass-middleware')
const MobileDetect = require('mobile-detect')
const i18n = require('i18n-express')
const cookieParser = require('cookie-parser')


app.set('view engine', 'pug')
app.use(cookieParser())

app.use('/:lang', (req, res, next) => {
  if(req.params.lang == 'cn' || req.params.lang == 'en') {
    req.cookies.ulang = req.params.lang
    next()
  }else{
    next()
  }
})

app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'), 
  siteLangs: ["cn","en"],
  textsVarName: 'langText',
  defaultLang: 'cn'
}));

// app.get('/', (req, res) => {
//   res.redirect('/cn')
// })

app.get('/cn', (req, res) => {
  let md = new MobileDetect(req.headers['user-agent'])  
  if( !md.mobile()  ){
    res.render('desktop/index', { currentLang: 'cn' })
  }else{
    res.render('mobile/index', { currentLang: 'cn' })
  }
})

app.get('/en', (req, res) => {
  let md = new MobileDetect(req.headers['user-agent'])  
  if( !md.mobile()  ){
    res.render('desktop/index', { currentLang: 'en' })
  }else{
    res.render('mobile/index', { currentLang: 'en' })
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
