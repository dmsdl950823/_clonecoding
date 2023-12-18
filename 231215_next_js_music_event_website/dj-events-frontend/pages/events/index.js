import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'
import { API_URL, PER_PAGE } from '@/config/index'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function EventsPage({ events, page, total }) {
  // console.log(events)

  return (
    <Layout>
      <h1>Events</h1>

      { events.length === 0 && <h3>No Events to show</h3> }
      { events.map(evt => (<EventItem key={evt.slug} evt={evt}></EventItem>)) }
      
      <Pagination page={page} total={total}/>
    </Layout>
  )
}

export async function getServerSideProps ({ query: { page = 1 } }) {
  // Calculate Start Page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch Events
  const eventRes = await fetch(`${API_URL}/api/event?sort=date:desc&pagination[page]=${start}&pagination[pageSize]=${PER_PAGE}`)
  const response = await eventRes.json()
  
  const events = response.data.map(({ id, attributes }) => ({ id, ...attributes }))
  const total = response.meta.pagination.total

  return {
    props: { events, page: +page, total }
  }
}
