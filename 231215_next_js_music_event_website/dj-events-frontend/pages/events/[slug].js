import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

// import { useEffect } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { API_URL } from '@/config/index'
import style from '@/styles/Event.module.css'

// 2) 클라이언트에서 props 로 데이터 가져옴
export default function EventPage({ evt }) {
  console.log('2) client side', evt);
  
  const router = useRouter()

  // useEffect(() => {
  //   if (!evt) {
  //     // Prefetch the dashboard page
  //     router.prefetch('/404')
  //   }
  // }, [router, evt])

  const deleteEvent = async e => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/event/${evt.id}`, {
        method: 'DELETE'
      })


      if (!res.ok) toast.error('Something went wrong')
      else router.replace('/')
    }
  }

  return (
    <Layout>
      <div className={style.event}>
        <div className={style.controls}>
          <Link href={`/events/edit/${evt.id}`}> <FaPencilAlt /> Edit Event </Link>
          <a href="#" className={style.delete} onClick={deleteEvent}> <FaTimes /> Delete Event </a>
        </div>

        <span> {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time} </span>
        <h1>{evt.name}</h1>

        <ToastContainer />

        { (evt.image) && (
            <div className={style.image}>
              <Image src={evt.image} width={960} height={600} alt={evt.image}/>
            </div>
          ) }
        
        <h3>Performers: </h3>
        <p>{evt.performers}</p>

        <h3>Descroption: </h3>
        <p>{evt.description}</p>
        
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events" className={style.back}>{'<'} Go Back</Link>
      </div>
    </Layout>
  )
}

// 메모)
// STATIC 사용 방법 :: getStaticPaths + getStaticProps (params) 함께 사용
// SSR 사용 방법   ::  getServerSideProps (query) 단독 사용


// 1) 서버에서 데이터 불러옴
// export async function getServerSideProps ({ query: { slug } }) {
  // console.log(slug, '-> SERVER SIDE')

// 1) StaticProps 으로 static 하게 불러옴
export async function getStaticProps ({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/event?filters[slug]=${slug}`)
  const { data } = await res.json()
  const events = data.map(({ id, attributes }) => ({ id, ...attributes }))

  console.log('1) 으아아아아악');

  return {
    props: {
      evt: events[0]
    },
    revalidate: 1
  }
}

export async function getStaticPaths () {
  const res = await fetch(`${API_URL}/api/event`)
  const { data } = await res.json()
  const events = data.map(({ id, attributes }) => ({ id, ...attributes }))
  
  const paths = events.map(evt => ({ params: { slug: evt.slug } }))

  // console.log(paths, '3) -> SERVER SIDE')

  return { paths, fallback: true }
}
