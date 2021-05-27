// BackEnd

const express = require('express')

const app = express()

app.use(express.json())

// http://localhost:5000/
app.get('/', (req, res) => {
    // res.json({ // json
    //     message: 'Meower! 😸'
    // })
    // res.send('Hello World! MEW! 😸 WELCOME CATOS!') // string
    res.send('<h1>Hello World! MEW! 😸 WELCOME CATOS!</h1>') // html
})


// http://localhost:5000/mew-list
// get all list data from db
app.get('/mew-list', (req, res) => {

})

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000')
})