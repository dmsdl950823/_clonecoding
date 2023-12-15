import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function SearchPage({ events }) {
  // console.log(events)
  const router = useRouter()

  return (
    <Layout title="Search Results">
      <Link href="/events">{'<'} Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>

      { events.length === 0 && <h3>No Events to show</h3> }
      { events.map(evt => (<EventItem key={evt.slug} evt={evt}></EventItem>)) }

    </Layout>
  )
}

export async function getServerSideProps ({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        { name: { $contains: term } },
        { performers: { $contains: term } },
        { description: { $contains: term } },
        { venue: { $contains: term } },
      ]
    }
    // _where: {
    //   _or: [
    //     { name_contains: term },
    //     { performers_contains: term },
    //     { description_contains: term },
    //     { venue_contains: term },
    //   ]
    // }
  })
  const res = await fetch(`${API_URL}/api/event?${query}`)
  const { data } = await res.json()
  const events = data.map(({ id, attributes }) => ({ ...id, ...attributes }))
  console.log(data);

  return {
    props: { events }
  }
}
