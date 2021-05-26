// ## Frontend

// document :: client side javascript
// querySelector ?? convenient
const form = document.querySelector('form') // grab <form>
const loadingElement = document.querySelector('.loading') // <div loading>

const mewsElement = document.querySelector('.mews')
const API_URL = 'http://localhost:5000/mews' // API 가져올/보낼 주소 => CORS 에러!
// const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/mews' : 'https://domain.sh'

loadingElement.style.display = '' // 1. default loading style => hidden

listAllMews()

form.addEventListener('submit', event => {
    event.preventDefault()

    // 1. get a form data
    const formData = new FormData(form)
    const name = formData.get('name') // input
    const content = formData.get('content') // textarea

    const mew = { name, content }
    
    form.style.display = 'none'
    loadingElement.style.display = ''

    // post
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdMeow => {
          console.log(createdMeow)

          form.reset()
          setTimeout(() => {
              form.style.display = ''
          }, 30000)

          listAllMews()
      })
})

function listAllMews () {
    mewsElement.innerHTML = ''
    fetch(API_URL)
        .then(response => response.json())
        .then(mews => {
            console.log(mews) // show all db data

            mews.reverse()
            mews.forEach(mew => {
                const div = document.createElement('div')

                const header = document.createElement('h3')
                header.textContent = mew.name // === innerText (security content)

                const contents = document.createElement('p')
                contents.textContent = mew.content
                
                const date = document.createElement('small')
                date.textContent = new Date(mew.created)

                div.appendChild(header)
                div.appendChild(contents)
                div.appendChild(date)

                mewsElement.appendChild(div)
            })
   
            loadingElement.style.display = 'none'
        })
}