const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/bharatInternDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req,res)=>{
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter)

app.listen(7000)