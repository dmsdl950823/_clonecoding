// ## Frontend

// document :: client side javascript
// queryselect :: its... convenient
const form = document.querySelector('form') // <form>
const loadingElement = document.querySelector('.loading') // <div.loading>

const API_URL = 'http://localhost:5000/mews' // API 가져올/보낼 주소 => 처음에 CORS 에러!

loadingElement.style.display = 'none'


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
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => console.log(response.json()))
})