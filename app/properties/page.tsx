
import PropertyCard from '@/components/PropertyCard'
import PropertySearchForm from '@/components/PropertySearchForm'
import { fetchProperties } from '@/utils/requests'
import { Key } from 'react'

interface PropertiesProps {
  searchParams: {
    pageSize?: number | 9,
    page?: number | 1,
  }
}
const PropertiesPage = async ({ searchParams }: PropertiesProps) => {
  const properties = await fetchProperties({ pagesSize: 10 })
  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h1 className='text-2xl mb-4'>Browse Properties</h1>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property, index: Key | null | undefined) => (
                <PropertyCard
                  _id={property?._id?.toString()}
                  owner={property?.owner?.toString()}
                  key={index}
                  type={property?.type || ''}
                  beds={property?.beds || 0}
                  baths={property?.baths || 0}
                  square_feet={property?.square_feet || 0}
                  location={{
                    city: property?.location?.city || "",
                    state: property?.location?.state || ""
                  }}
                  images={property?.images || []}
                  rates={{
                    weekly: property?.rates?.weekly,
                    monthly: property?.rates?.monthly,
                    nightly: property?.rates?.nightly
                  }} />
              ))}
            </div>
          )}
          {/* {showPagination && (
            <Pagination
              page={parseInt(page)}
              pageSize={parseInt(pageSize)}
              totalItems={total}
            />
          )} */}
        </div>
      </section>
    </>
  )
}

export default PropertiesPage
