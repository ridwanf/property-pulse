"use client"
import { useRouter, useParams } from 'next/navigation'
import React, { use } from 'react'

const PropertyPage = () => {
  const router = useRouter()
  const { id } = useParams()
  return (
    <div>
      <h1>Property Page {id}</h1>
      <button onClick={() => { router.push('/') }} className="bg-blue-500 p-2">
        Go Home
      </button>

    </div>
  )
}

export default PropertyPage
