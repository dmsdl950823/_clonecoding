import Layout from '@/components/Layout'
import Link from 'next/link'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function HomePage({ events }) {
  console.log(events, 'client side')

  return (
    <Layout>
      <h1>Upcoming Events</h1>

      { events.length === 0 && <h3>No Events to show</h3> }
      { events.map(evt => (<EventItem key={evt.slug} evt={evt}></EventItem>)) }
      { events.length > 0 && (
        <Link href="/events" className="btn-secondary">View All Events</Link>
      ) }

    </Layout>
  )
}

// export async function getServerSideProps () {
export async function getStaticProps () {
  const res = await fetch(`${API_URL}/api/event?sort=date:desc&pagination[page]=1&pagination[pageSize]=3`)
  const { data } = await res.json()
  const events = data.map(({ id, attributes }) => ({ id, ...attributes }))

  return {
    props: { events },
    revalidate: 1
  }
}
