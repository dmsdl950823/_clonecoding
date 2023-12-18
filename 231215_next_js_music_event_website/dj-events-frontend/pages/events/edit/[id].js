import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import { FaImage } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { API_URL } from '@/config/index'
import style from '@/styles/Form.module.css'

import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

export default function EditEventPage({ evt }) {
  const [values, setValues] = useState({ ...evt })

  const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null)
  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    // console.log(values, 'submit')

    // Validation
    const hasEmptyFields = Object.values(values).some(element => element === '')
    if (hasEmptyFields) return toast.error('Please fill in all fields');

    const res = await fetch(`${API_URL}/api/event/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Accept": "*/*"
      },
      body: JSON.stringify({ data: values })
    })

    if (!res.ok) toast.error('Something went wrong')
    else {
      const { data } = await res.json()
      const { slug } = data.attributes
      router.push(`/events/${slug}`)
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    const slug = values.name?.replace(/ /gi, '-').toLowerCase()
    setValues({...values, [name]: value, slug })
    // console.log('change', values)
  }

  const imageUploaded = async e => {
    const res = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await res.json()
    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)

    console.log(data);
  }


  return (
    <Layout title="Edit Event">
      <Link href="/events">Go Bak</Link>
      <h1>Edit Event</h1>

      <ToastContainer />

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange}></input>
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" id="performers" name="performers" value={values.performers} onChange={handleInputChange}></input>
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" id="venue" name="venue" value={values.venue} onChange={handleInputChange}></input>
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" value={values.address} onChange={handleInputChange}></input>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={moment(values.date).format('yyyy-MM-DD')} onChange={handleInputChange}></input>
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" id="time" name="time" value={values.time} onChange={handleInputChange}></input>
          </div>
        </div>

        <div>
            <label htmlFor="description">Event Description</label>
            <textarea type="text" id="description" name="description" value={values.description} onChange={handleInputChange}></textarea>
          </div>

          <input type="submit" value="Update Event" className="btn"></input>
      </form>

      <h2>Event Image</h2>
      { imagePreview ?
        (<Image src={imagePreview} height={100} width={170} alt="image"/>)
        : (<div><p>No image Uploaded</p></div>)
      }

      <div><button className="btn-secondary" onClick={e => setShowModal(true)}><FaImage /> Set Image </button></div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps ({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/api/event/${id}`)
  const { data } = await res.json()
  const evt = { id: data.id, ...data.attributes }

  // 
  console.log('@@ Cookie :: ', req.headers.cookie);

  return {
    props: { evt }
  }
}