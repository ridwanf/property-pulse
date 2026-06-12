import Hero from "@/components/Hero"
export const dynamic = 'force-dynamic'

import HomeProperties from "@/components/HomeProperties"
import InfoBoxes from "@/components/InfoBoxes"

const HomePage = () => {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  )
}

export default HomePage
