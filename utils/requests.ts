import { PropertyClass } from "@/models/Property"


const getApiUrl = () => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    const url = process.env.NEXTAUTH_URL_INTERNAL || 'http://localhost:3000'
    console.log('🔵 SERVER-SIDE | NEXTAUTH_URL_INTERNAL:', process.env.NEXTAUTH_URL_INTERNAL)
    console.log('🔵 SERVER-SIDE | URL used:', url)
    return url
  }

  const url = process.env.NEXT_PUBLIC_API_DOMAIN
  console.log('🟢 CLIENT-SIDE | URL used:', url)
  return url
}


interface FetchPropertiesResponse {
  pagesSize: number
}

async function fetchProperties(props: FetchPropertiesResponse): Promise<PropertyClass[]> {
  try {
    const API_URL = getApiUrl()

    if (!API_URL) {
      return []
    }

    const response = await fetch(`${API_URL}/api/properties?pageSize=${props.pagesSize}`, {
      cache: 'no-store',
    })
    console.log('Response from API:', response)
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
    const API_URL = getApiUrl()

    if (!API_URL) {
      console.error('API_URL is not defined')
      return null
    }

    const response = await fetch(`${API_URL}/api/properties/${id}`, {
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