"use client"
import PropertyDetails from '@/components/PropertyDetails'
import PropertyHeaderImage from '@/components/PropertyHeaderImage'
import PropertyImages from '@/components/PropertyImages'
import ShareButtons from '@/components/ShareButtons'
import { PropertyClass } from '@/models/Property'
import { fetchPropertyById } from '@/utils/requests'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

export default function PropertyPage() {
  const { id } = useParams() as { id: string }
  const [property, setProperty] = useState<PropertyClass | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // Simulate fetching property data
    const fetchProperty = async () => {
      if (id) {
        try {
          const res = await fetchPropertyById(id)
          setProperty(res)
        } catch (error) {
          console.error('Error fetching property:', error)
        }
        finally {
          setIsLoading(false)
        }
      } else {
        return
      }
    }
    if (!property) {
      fetchProperty()
    }
  }, [id, property])
  return (
    <>
      {!isLoading && property && property.images && property.images[0] && (
        <PropertyHeaderImage image={property.images[0]} />
      )}
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>
      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <PropertyDetails property={{
              type: property?.type || '',
              name: property?.name || '',
              beds: property?.beds || 0,
              baths: property?.baths || 0,
              square_feet: property?.square_feet || 0,
              location: {
                city: property?.location?.city || '',
                state: property?.location?.state || '',
                street: property?.location?.street || '',
                zipcode: property?.location?.zipcode || ''
              },
              rates: {
                nightly: property?.rates?.nightly,
                weekly: property?.rates?.weekly,
                monthly: property?.rates?.monthly
              },
              description: property?.description || '',
              amenities: property?.amenities || []
            }} />

            {/* <!-- Sidebar --> */}
            <aside className='space-y-4'>
              {/* <BookmarkButton property={property} /> */}
              <ShareButtons property={{
                name: property?.name || '',
                type: property?.type || '',
                _id: property?._id?.toString() || ''
              }} />
              {/* <PropertyContactForm property={property} /> */}
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property?.images || []} />
    </>
  )
}