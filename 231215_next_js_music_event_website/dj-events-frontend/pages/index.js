import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function HomePage({ events }) {
  // console.log(events)

  return (
    <Layout>
      <h1>Upcoming Events</h1>

      { events.length === 0 && <h3>No Events to show</h3> }
      { events.map(evt => (<EventItem key={evt.id} evt={evt}></EventItem>)) }

    </Layout>
  )
}

// export async function getServerSideProps () {
export async function getStaticProps () {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  console.log(events);

  return {
    props: { events },
    revalidate: 1
  }
}
