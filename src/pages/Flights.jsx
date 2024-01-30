import { FlightDeals, Hero, Testimonials,ContactUs,Advertice } from "../components"
import Places from "../components/Places"


const Flights = () => {
  return (
    <>
    <div className="mt-[70px]">
     <Hero/>
    </div>
    <div className="mt-[40px]">
      <FlightDeals/>
    </div>
    <div className="mt-[60px]">
     <Advertice/>
    </div>
    <div className="mt-[60px]">
     <ContactUs/>
    </div>
    <div className="mt-[90px]">
    <Testimonials/>
    </div>
    </>
  )
}

export default Flights