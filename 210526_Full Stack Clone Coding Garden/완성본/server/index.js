const express = require('express') // server
const cors = require('cors')
const monk = require('monk')
const Filter = require('bad-words')
const rateLimit = require('express-rate-limit')
// nodemon :: server change watching 
// cors :: fix cross origin error 
// monk :: mongoDB library
// bad-words :: filter bad-words

const app = express()
// const db = monk(process.env.MONGO_URI || 'localhost/meower') // deploy mode(build) || development
const db = monk('localhost/meower') // deploy mode(build) || development
const mews = db.get('mews')
const filter = new Filter()

app.use(cors()) // 모든 Access-Control Error 를 차단함
app.use(express.json())

app.get('/', (reqest, response) => {
    response.json({
        message: 'Mewoer! 🐱‍🚀'
    })
})

app.get('/mews', (req, res) => {
    // get all data from db :: http://localhost:5000/mews
    mews.find()
        .then(mews => {
            res.json(mews)
        })
})

function isValidMew (mew) {
    return (
        mew.name && mew.name.toString().trim() !== '' &&
        mew.content && mew.content.toString().trim() !== ''
    )
}

// request limitaion
app.use(rateLimit({
    windowMs: 30 * 1000, // every 30 secs
    max: 1 // limit each IP to 1 requests per WindowMs
}))

// post data
app.post('/mews', (request, response) => {
    console.log(request.body) // { name: 'test', content: 'test' }

    if (isValidMew(request.body)) {
        const mew = {
            name: filter.clean(request.body.name.toString()),
            content: filter.clean(request.body.content.toString()),
            created: new Date()
        }
        // console.log(mew, 'mew?')
        // console.log(mews, 'mew?')

        // insert into db...
        mews.insert(mew)
            .then(createdMew => {
                console.log(createdMew)
                response.json(createdMew)
            })
    } else {
        response.status(422)
        response.json({
            message: 'Hey! Name and Content are required!'
        })
    }
})

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000')
})