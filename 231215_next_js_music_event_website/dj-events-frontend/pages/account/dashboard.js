import { parseCookies } from '@/helpers/index'
import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'

export default function DashboardPage({ events }) {
  // console.log('@@ CLIENT > events ', events);
  const deleteEvent = id => {
    console.log(id);
  }


  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        { events.map(evt => (<DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent}>{evt}</DashboardEvent>)) }
      </div>
    </Layout>
  )
}

export async function getServerSideProps ({ req }) {
  const { token } = parseCookies(req)

  // console.log('@@ token', token)

  // ME Event 는 strapi 버전이 안맞아서 BE 에 따로 안만들었음
  // const res = await fetch(`${API_URL}/api/events/me`, {
  //   method: 'GET',
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // })

  // const events = await res.json()

  return {
    props: { events: [
      {
          "id": 2,
          "name": "Throwback Thursday with DJ Manny Duke",
          "slug": "throwback-thursday-with-dj-manny-duke",
          "venue": "Horizon Club",
          "address": "919 3rd Ave New York, NewYork(NY), 10022",
          "date": "2023-12-22T03:00:00.000Z",
          "time": "8:00 PM",
          "performers": "DJ Manny Duke",
          "createdAt": "2023-12-15T06:06:38.947Z",
          "updatedAt": "2023-12-18T04:54:04.406Z",
          "publishedAt": "2023-12-15T06:08:08.213Z",
          "description": "The start of accession talks was a momentous moment and stunning reversal for a country at war that had struggled to find the backing for its membership aspirations and long faced obstinate opposition from Orban."
      },
      {
          "id": 3,
          "name": "Boom Dance Festival Experience",
          "slug": "boom-dance-festival-experience",
          "venue": "Blackjacks",
          "address": "966 Lexington Ave New York, New York(NY), 10021",
          "date": "2023-12-28T03:00:00.000Z",
          "time": "8:00 PM",
          "performers": "DJ LUCK & MC NEAT, NICKY BLACMARKET, DJ NICKY BLACK MARKET, RATPACK",
          "createdAt": "2023-12-15T06:36:19.826Z",
          "updatedAt": "2023-12-15T07:45:02.596Z",
          "publishedAt": "2023-12-15T06:42:14.991Z",
          "description": "The financial package could not be endorsed after Orban vetoed both the extra money and a review of the EU budget. Ukraine is badly counting on the funds to help its damaged economy survive in the coming year."
      },
      {
          "id": 4,
          "name": "Encore Night Boat Party",
          "slug": "encore-night-boat-party",
          "venue": "Encore",
          "address": "675 Water St New York, New York(NY), 10002",
          "date": "2023-12-30T03:00:00.000Z",
          "time": "7:00 PM",
          "performers": "Bad Boy Bill",
          "createdAt": "2023-12-15T06:44:19.714Z",
          "updatedAt": "2023-12-19T04:32:43.962Z",
          "publishedAt": "2023-12-15T06:44:20.577Z",
          "description": "\"I can inform you that 26 leaders agreed on the (budget negotiation),\" European Council President Charles Michel said. \"I should be very precise. One leader, Sweden, needs to consult its parliament, which is in line with the usual procedure for this country, and one leader couldn't agree.\""
      },
      {
          "id": 8,
          "name": "DJ Midnight Party",
          "slug": "dj-midnight-party",
          "venue": "meme",
          "address": "meme address",
          "date": "2023-12-21T15:00:00.000Z",
          "time": "MIDNIGHT",
          "performers": "DJ me",
          "createdAt": "2023-12-18T02:39:16.632Z",
          "updatedAt": "2023-12-18T02:39:16.632Z",
          "publishedAt": "2023-12-18T02:39:16.627Z",
          "description": "Hello Hello welcome to the biggest party in the world!"
      },
      {
          "id": 11,
          "name": "New MZ Only DJ Party Show",
          "slug": "new-mz-only-dj-party-show",
          "venue": "new born baby show",
          "address": "new born, NEW YORK(NYC)",
          "date": "2023-12-21T15:00:00.000Z",
          "time": "10:00 PM",
          "performers": "MZ 2020",
          "createdAt": "2023-12-18T02:43:39.561Z",
          "updatedAt": "2023-12-18T02:43:39.561Z",
          "publishedAt": "2023-12-18T02:43:39.559Z",
          "description": "gggeasdfdf"
      }
  ] }
  }
}