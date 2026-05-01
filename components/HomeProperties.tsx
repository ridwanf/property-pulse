import PropertyCard from './PropertyCard';
import Link from 'next/link';
import { fetchProperties } from '@/utils/requests';

const HomeProperties = async () => {
  const properties = await fetchProperties({ pagesSize: 3 })

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Properties
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              properties.map((property, index) => (
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
              ))
            )}
          </div>
        </div>
      </section>

      <section className='m-auto max-w-lg my-10 px-6'>
        <Link
          href='/properties'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
}

export default HomeProperties
