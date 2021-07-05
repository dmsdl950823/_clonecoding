

let currentPage = 1

const dataPerPage = 10
const lastPage = 5

const loadingMessage = document.getElementById('msg-loading')

// 데이터 추가 함수
function addData (curr) {
  const list = document.getElementById('list')

  let data = (curr - 1) * dataPerPage + 1
  let totalData = curr * dataPerPage

  for (let i = data; i <= totalData; i++) {
    const li = document.createElement('li')
    li.textContent = `${curr} Page : ${i} data`
    li.classList.add('fade-in')
    list.appendChild(li)
  }
}

// IntersectionObserver 갱신 함수
function observeLastChild (io) {
  const lists = document.querySelectorAll('#list li')
  lists.forEach(li => {
    if (!li.nextSibling && currentPage < lastPage) {
      // li 에 대하여 관찰 시작
      io.observe(li)
    } else if (currentPage >= lastPage) {
      io.disconnect()
      loadingMessage.textContent = 'Last Page'
    }
  })
}

// IntersectionObserver 부분
const observerOption = {
  root: null, // 교차영역의 기준이 되는 루트 요소, null = 브라우저의 뷰포트
  rootMargin: '0px 0px 0px 0px', // root 영역을 늘이거나 줄일 수 있음
  threshold: 0.5 // root 와 타깃 요소의 교차 영역 비율(intersection ratio)
}

// IntersectionObserver 인스턴스 생성
const intersectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // entry.isIntersecting: 특정 요소가 뷰포트와 50%(thredhold 0.5) 교차된경우
    if (entry.isIntersecting) {
      loadingMessage.classList.add('fade-in')
      console.log(entry)

      // 다음데이터 호출 : 자연스러운 연출을 위해 setTimeout 사용
      setTimeout(() => {
        addData(++currentPage)
        observer.unobserve(entry.target)
        observeLastChild(observer)

        loadingMessage.classList.remove('fade-in')
      }, 1000)
    }
  })
}, observerOption)

// 초기 데이터 생성
addData(currentPage)
observeLastChild(intersectionObserver)

/*
  IntersectionObserver  => https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver/IntersectionObserver

  대상 요소의 화면에 보이는 부분 백분율이 역치보다 클 때 호출할 함수입니다. 다음의 두 매개변수를 받습니다.
  entries :: 더 보이거나 덜 보이게 되면서 통과한 역치를 나타내는, IntersectionObserverEntry (en-US) 객체의 배열
  observer :: 자신을 호출한 IntersectionObserver
  */
