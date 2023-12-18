import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function EventsPage({ events }) {
  // console.log(events)

  return (
    <Layout>
      <h1>Events</h1>

      { events.length === 0 && <h3>No Events to show</h3> }
      { events.map(evt => (<EventItem key={evt.slug} evt={evt}></EventItem>)) }
      

    </Layout>
  )
}

export async function getStaticProps () {
  const res = await fetch(`${API_URL}/api/event`)
  const { data } = await res.json()
  const events = data.map(({ id, attributes }) => ({ id, ...attributes }))

  return {
    props: { events },
    revalidate: 1
  }
}
