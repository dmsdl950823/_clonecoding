// ## Frontend

// document :: client side javascript
// queryselect :: its... convenient
const form = document.querySelector('form') // <form>
const loadingElement = document.querySelector('.loading') // <div.loading>

const mewsElement = document.querySelector('.mews')
const API_URL = 'http://localhost:5000/mews' // API 가져올/보낼 주소 => 처음에 CORS 에러!

loadingElement.style.display = 'none'

listAllMews()

form.addEventListener('submit', e => {
    e.preventDefault()

    // 1. get a form data
    const formData = new FormData(form)
    const name = formData.get('name') // input value
    const content = formData.get('content') // textarea value

    const mew = { name, content }

    form.style.display = 'none'
    loadingElement.style.display = ''

    // posting
    fetch(API_URL, {
         // 1) Send POST request
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(createdMeow => { // 5) Get response from server
        console.log(createdMeow)

        form.reset()
        setTimeout(() => {
            form.style.display = ''
        }, 3000)

        listAllMews() // 6) Get all lists from server
    })
})

function listAllMews () {
    mewsElement.innerHTML = ''
    
    fetch(API_URL)
        .then(response => response.json())
        .then(lists => {
            console.log(lists) // all lists from database

            lists.reverse()
            lists.forEach(item => {
                const div = document.createElement('div')

                const header = document.createElement('h3')
                header.textContent = item.name

                const contents = document.createElement('p')
                contents.textContent = item.content
                
                const date = document.createElement('small')
                date.textContent = new Date(item.created)

                div.appendChild(header)
                div.appendChild(contents)
                div.appendChild(date)

                mewsElement.appendChild(div)
            })

            loadingElement.style.display = 'none'
        })
}