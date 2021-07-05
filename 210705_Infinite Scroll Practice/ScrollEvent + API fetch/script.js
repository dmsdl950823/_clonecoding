
  function loadLists () {

    const quotesEl = document.querySelector('.quotes')
    const loaderEl = document.querySelector('.loader')

    // API 에서 quote 데이터를 가져옵니다
    const getQuotes = async (page, limit) => {
      const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`An error occured: ${response.status}`)
      }
      return await response.json()
    }

    // quotes 내용을 보여줍니다.
    const showQuotes = quotes => {
      quotes.forEach(quote => {
        const blockquote = document.createElement('blockquote')
        blockquote.classList.add('quote')

        blockquote.innerHTML = `
          <span>${quote.id}</span>
          ${quote.quote}
          <footer>${quote.author}</footer>
        `

        quotesEl.appendChild(blockquote)
      })
    }

    const hideLoader = () => loaderEl.classList.remove('show')
    const showLoader = () => loaderEl.classList.add('show')

    // quotes 가 더 있는지 확인 (boolean)
    const hasMoreQuotes = (page, limit, total) => {
      const startIndex = (page - 1) * limit + 1
      return total === 0 || startIndex < total
    }

    // quotes 로드
    const loadQuotes = async (page, limit) => {
      showLoader() // loader 보여주기

      setTimeout(async () => {
        try {
          // fetch 할 quotes 있으면 API 호출
          if (hasMoreQuotes(page, limit, total)) {
            const response = await getQuotes(page, limit) // data fetch
            showQuotes(response.data) // quotes 내용 생성
            total = response.total
          }
        } catch (error) {
          console.error(error.message)
        } finally {
          hideLoader() // loader 제거 
        }
      }, 500)
    }

    // 실제로 사용 시작 하는곳 =====

    let currentPage = 1
    const limit = 10
    let total = 0

    function scroll (e) {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement

      const condition1 = scrollTop + clientHeight >= scrollHeight - 5 // 스크롤이 움직인경우
      const condition2 = hasMoreQuotes(currentPage, limit, total) // quotes 가 있는지

      if (condition1 && condition2) {
        currentPage++
        loadQuotes(currentPage, limit)
      }
    }

    // 초기 시작
    loadQuotes(currentPage, limit)
    window.addEventListener('scroll', scroll, { passive: true })

  }

  loadLists()