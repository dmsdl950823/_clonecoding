// BackEnd

const express = require('express')
const cors = require('cors')
const monk = require('monk')

const app = express()

app.use(cors())  // 모든 Access-Control Error 를 차단함
app.use(express.json())
const db = monk('localhost/meower') // mewoer 라는 db 생성됨
const lists = db.get('mews')

// root directory :: http://localhost:5000/
app.get('/', (req, res) => {
    // json
    // res.json({ message: 'Meower! 😸' })
    // res.send('Hello World! MEW! 😸 WELCOME CATOS!') // string
    res.send('<h1>Hello World! MEW! 😸 WELCOME CATOS!<br>This is Cato\'s home!</h1>') // html
})

// 📥 4) GET all data from DB :: http://localhost:5000/mews
app.get('/mews', (req, res) => {
    lists.find()
        .then(mews => {
            res.json(mews)
        })
}) 

// 📤POST data
// const API_URL = 'http://localhost:5000/mews' // Client API :: 가져올/보낼 주소 => 처음에 CORS 에러!
app.post('/mews', (req, res) => {
    // 2) get body from client's request (you can see the result through command line)
    console.log(req.body)

    // 3) response to client
    if (isValidMew(req.body)) {
        console.log('passed 🤩')

        const payload = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        }
        
        // 3-1) insert into db...
        lists.insert(payload)
            .then(insertedData => {
                res.json(insertedData)
            })

    } else {
        console.log('unpassed 😒')

        // 3-2) Error Handling
        response.status(422)
        res.json({
            message: 'Hey! Name and Content are required!'
        })
    }
})


app.listen(5000, () => {
    console.log('Listening on http://localhost:5000')
})

function isValidMew (mew) {
    return (
        mew.name && mew.name.toString().trim() !== '' &&
        mew.content && mew.content.toString().trim() !== ''
    )
}