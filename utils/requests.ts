import { PropertyClass } from "@/models/Property"

const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN

interface FetchPropertiesResponse {
  pagesSize: number
}

async function fetchProperties(props: FetchPropertiesResponse): Promise<PropertyClass[]> {
  try {
    if (!API_URL) {
      return []
    }

    const response = await fetch(`${API_URL}/properties?pageSize=${props.pagesSize}`, {
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new Error('Failed to fetch properties')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

async function fetchPropertyById(id: string): Promise<PropertyClass | null> {

  console.log('Fetching property with ID:', id)
  try {
    if (!API_URL) {
      console.error('API_URL is not defined')
      return null
    }

    const response = await fetch(`${API_URL}/properties/${id}`, {
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new Error('Failed to fetch property')
    }
    console.log('Response from API:', response)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching property:', error)
    return null
  }
}


export { fetchProperties, fetchPropertyById }