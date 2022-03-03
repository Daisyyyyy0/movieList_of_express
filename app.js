const express = require('express')
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')
const app = express()
const port = 3004

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res)=> {
    res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res)=> {
    console.log('req.query', req.query)
    const keyword = req.query.keyword
    const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
    res.render('index', { movies: movies, keyword:req.query.keyword })
})

app.get('/movies/:movie_id', (req, res) =>{
    const movieee = movieList.results.filter( item => item.id == req.params.movie_id)
    console.log('req.params.movie_id',req.params.movie_id);
    res.render('show', {movie: movieee[0] } )
})

app.listen(port, (req, res) => {
    console.log(`Express is listening on localhost:${port}`);
})
