// ## Frontend

// document :: client side javascript
// queryselect :: its... convenient
const form = document.querySelector('form') // <form>
const loadingElement = document.querySelector('.loading') // <div.loading>

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
})