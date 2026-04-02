const express = require('express');

const app = express();

app.use(express.json())

let movies = [
    {id: 0, title: "The Matrix", year: 1999},
    {id: 1, title: "Inception", year: 2010},
    {id: 2, title: "Interstellar", year: 2014},
]

app.get('/api/movies', (req, res) => {
    res.json(movies) // Svaret skickas i json-format
})

// Crud CREATE
app.post('/api/movies', (req, res) => {
    const { title, year } = req.body

    if (!title || !year) {
        return res.status(400).json(
            {
                message: "Title eller year saknas",
                error: "invalid_request"
            }
        )
    }

    const newMovie = {id: movies.length, title, year}
    movies.push(newMovie)
    return res.status(201).json(newMovie)
})

// cRud READ
app.get('/api/movies/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const movie = movies.find(m => m.id === id)
    
    if(!movie) {
        return res.status(404).json({
            message: "Filmen hittades inte"
        })
    }
    
    return res.json(movie)
})

// crUd UPDATE
app.put('/api/movies/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = movies.findIndex(m => m.id === id)

    if (index === -1) {
        return res.status(404).json({
            message: `Filmen ${id} hittades inte`,
            status: 404 
        })
    }

    movies[index] = {id, ...req.body}
    res.json({data: movies[index]})
})

//cruD DELETE
app.delete('/api/movies/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const movie = movies.find(m => m.id === id)

    if(!movie) {
        return res.status(404).json({
            message: "Filmen hittades inte"
        })
    }

    movies = movies.filter((m) => {
        return m.id === id ? false : true
    })

    return res.status(200).json({
        message: "Filmen borta!"
    })
})

app.get('/', (req, res) => {
    res.send("Heybaberiba!")
})

app.listen(3000, () => {
    console.log("Server alive and kicking!");
})

