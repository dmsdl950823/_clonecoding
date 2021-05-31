// BackEnd

const express = require('express')
const cors = require('cors')
const monk = require('monk')

const app = express()

app.use(cors())  // 모든 Access-Control Error 를 차단함
app.use(express.json())
const db = monk('localhost/meower')

// root directory :: http://localhost:5000/
app.get('/', (req, res) => {
    // res.json({ // json
    //     message: 'Meower! 😸'
    // })
    // res.send('Hello World! MEW! 😸 WELCOME CATOS!') // string
    res.send('<h1>Hello World! MEW! 😸 WELCOME CATOS!<br>This is Cato\'s home!</h1>') // html
})

// 📥 GET data from DB
app.get('/mews', (req, res) => {
}) 

// 📤POST data
// const API_URL = 'http://localhost:5000/mews' // Client API :: 가져올/보낼 주소 => 처음에 CORS 에러!
app.post('/mews', (req, res) => {
})


app.listen(5000, () => {
    console.log('Listening on http://localhost:5000')
})