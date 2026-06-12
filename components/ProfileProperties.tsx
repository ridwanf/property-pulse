'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import deleteProperty from '@/app/actions/deleteProperty';

interface Property {
  _id: string;
  name: string;
  images: string[];
  location: {
    street: string;
    city: string;
    state: string;
  };
}

const ProfileProperties = ({ properties: initialProperties }: { properties: Property[] }) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this property?'
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete property');
        toast.error('Failed to delete property. Please try again.');
      } else {
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );
        setProperties(updatedProperties);
        toast.success('Property deleted successfully');
      }

    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property. Please try again.');
      return;

    }

    const deletePropertyById = deleteProperty.bind(null, propertyId);

    await deletePropertyById();


    const updatedProperties = properties.filter(
      (property) => property._id !== propertyId
    );

    setProperties(updatedProperties);
  };

  return properties.map((property) => (
    <div key={property._id} className='mb-10'>
      <Link href={`/properties/${property._id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={property.images[0]}
          alt=''
          width={500}
          height={100}
          priority={true}
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.name}</p>
        <p className='text-gray-600'>
          Address: {property.location.street} {property.location.city}{' '}
          {property.location.state}
        </p>
      </div>
      <div className='mt-2'>
        <Link
          href={`/properties/${property._id}/edit`}
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
        >
          Edit
        </Link>
        <button
          onClick={() => handleDeleteProperty(property._id)}
          className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
          type='button'
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
