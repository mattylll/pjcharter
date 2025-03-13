import Link from 'next/link'
import ImageComponent from '../components/ImageComponent'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] max-h-[800px] text-white">
        {/* Full-screen hero image */}
        <div className="absolute inset-0 w-full h-full">
          <ImageComponent 
            src="/images/hero/homepage/homepage-1-desktop.jpg" 
            alt="PJ Charter - Private Jet Hire"
            fill
            priority
            objectFit="cover"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
        </div>
        
        {/* Hero content */}
        <div className="container-custom relative z-20 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif leading-tight">
              Experience Luxury Travel with PJ Charter
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Premium private jet charter services tailored to your needs. Travel in comfort, style, and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking" className="btn-primary text-center text-lg py-3 px-8">
                Book Your Flight
              </Link>
              <Link href="/services" className="bg-white text-secondary-900 hover:bg-secondary-100 font-semibold text-lg py-3 px-8 rounded-md transition duration-300 text-center">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="bg-white py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 -mt-20 relative z-20">
            <h2 className="heading-3 mb-6 text-center">Find Your Perfect Flight</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="from" className="block text-sm font-medium text-secondary-700 mb-1">
                  From
                </label>
                <input
                  type="text"
                  id="from"
                  placeholder="Departure City or Airport"
                  className="w-full p-3 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label htmlFor="to" className="block text-sm font-medium text-secondary-700 mb-1">
                  To
                </label>
                <input
                  type="text"
                  id="to"
                  placeholder="Arrival City or Airport"
                  className="w-full p-3 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-secondary-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full p-3 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label htmlFor="passengers" className="block text-sm font-medium text-secondary-700 mb-1">
                  Passengers
                </label>
                <select
                  id="passengers"
                  className="w-full p-3 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                  <option value="5">5 Passengers</option>
                  <option value="6">6+ Passengers</option>
                </select>
              </div>
              <div className="md:col-span-2 lg:col-span-4 mt-2">
                <button type="submit" className="w-full btn-primary py-3">
                  Search Flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Popular Destinations</h2>
            <p className="paragraph max-w-3xl mx-auto">
              Discover our most requested routes and destinations for private jet travel. From business hubs to exotic getaways, we connect you to the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Destination Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 w-full">
                <ImageComponent 
                  src="/images/destinations/europe/united-kingdom/london/aerial/aerial-1-desktop.jpg" 
                  alt="London, UK"
                  fill
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">London, UK</h3>
                <p className="text-secondary-600 mb-4">
                  Business hub with world-class amenities and convenient access to multiple airports.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-semibold">Popular route</span>
                  <Link href="/destinations/lon" className="text-primary-600 hover:text-primary-800 font-medium">
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Destination Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 w-full">
                <ImageComponent 
                  src="/images/destinations/europe/france/paris/landmarks/landmarks-1-desktop.jpg" 
                  alt="Paris, France"
                  fill
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Paris, France</h3>
                <p className="text-secondary-600 mb-4">
                  Romantic getaway with luxury accommodations and fine dining experiences.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-semibold">Leisure favorite</span>
                  <Link href="/destinations/par" className="text-primary-600 hover:text-primary-800 font-medium">
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Destination Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 w-full">
                <ImageComponent 
                  src="/images/destinations/north-america/usa/new-york/aerial/aerial-1-desktop.jpg" 
                  alt="New York, USA"
                  fill
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">New York, USA</h3>
                <p className="text-secondary-600 mb-4">
                  Global financial center with multiple convenient airport options for private jets.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-semibold">Business essential</span>
                  <Link href="/destinations/nyc" className="text-primary-600 hover:text-primary-800 font-medium">
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/destinations" className="btn-secondary">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Aircraft Categories */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Aircraft Fleet</h2>
            <p className="paragraph max-w-3xl mx-auto">
              Choose from our extensive selection of private jets, each offering unique features and capabilities to match your travel requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Aircraft Category 1 */}
            <div className="bg-secondary-50 rounded-lg p-6 text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Light Jets</h3>
              <p className="text-secondary-600 mb-4">
                Perfect for short trips with 4-6 passengers. Efficient and cost-effective.
              </p>
              <Link href="/aircraft?category=light%20jet" className="text-primary-600 hover:text-primary-800 font-medium">
                View Light Jets →
              </Link>
            </div>
            
            {/* Aircraft Category 2 */}
            <div className="bg-secondary-50 rounded-lg p-6 text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Midsize Jets</h3>
              <p className="text-secondary-600 mb-4">
                Ideal for medium-range flights with 6-8 passengers. Balance of comfort and range.
              </p>
              <Link href="/aircraft?category=midsize%20jet" className="text-primary-600 hover:text-primary-800 font-medium">
                View Midsize Jets →
              </Link>
            </div>
            
            {/* Aircraft Category 3 */}
            <div className="bg-secondary-50 rounded-lg p-6 text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Heavy Jets</h3>
              <p className="text-secondary-600 mb-4">
                Designed for long-range travel with 8-14 passengers. Spacious and luxurious.
              </p>
              <Link href="/aircraft?category=heavy%20jet" className="text-primary-600 hover:text-primary-800 font-medium">
                View Heavy Jets →
              </Link>
            </div>
            
            {/* Aircraft Category 4 */}
            <div className="bg-secondary-50 rounded-lg p-6 text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">VIP Airliners</h3>
              <p className="text-secondary-600 mb-4">
                Ultimate luxury for large groups or VIP travel. Customized interiors and amenities.
              </p>
              <Link href="/aircraft?category=vip%20airliner" className="text-primary-600 hover:text-primary-800 font-medium">
                View VIP Airliners →
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/aircraft" className="btn-secondary">
              Explore All Aircraft
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Services</h2>
            <p className="paragraph max-w-3xl mx-auto">
              PJ Charter offers a comprehensive range of private aviation services tailored to meet your specific requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Business Travel</h3>
                <p className="text-secondary-600 mb-4">
                  Efficient and reliable private jet solutions for corporate travel. Maximize productivity and minimize travel time.
                </p>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Flexible scheduling
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Onboard meeting facilities
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    High-speed Wi-Fi
                  </li>
                </ul>
                <Link href="/services/business-travel-service" className="text-primary-600 hover:text-primary-800 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Leisure Travel</h3>
                <p className="text-secondary-600 mb-4">
                  Luxury private jet experiences for vacations and personal travel. Begin your holiday the moment you step onboard.
                </p>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Personalized service
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Gourmet catering
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Access to remote destinations
                  </li>
                </ul>
                <Link href="/services/leisure-travel-service" className="text-primary-600 hover:text-primary-800 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Group Charters</h3>
                <p className="text-secondary-600 mb-4">
                  Specialized solutions for group travel, events, and corporate retreats. Seamless coordination for multiple passengers.
                </p>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Large capacity aircraft
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Custom itineraries
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Event coordination
                  </li>
                </ul>
                <Link href="/services/group-charter-service" className="text-primary-600 hover:text-primary-800 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/services" className="btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">How It Works</h2>
            <p className="paragraph max-w-3xl mx-auto">
              Booking your private jet charter with PJ Charter is simple and straightforward. We handle all the details so you can focus on your journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Request a Quote</h3>
              <p className="text-secondary-600">
                Fill out our simple booking form with your travel details, or contact our team directly for personalized assistance.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Receive Your Options</h3>
              <p className="text-secondary-600">
                Our team will provide you with tailored aircraft options and a detailed quote based on your specific requirements.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Your Flight</h3>
              <p className="text-secondary-600">
                Once confirmed, we handle all the details. Simply arrive at the terminal and experience the luxury of private aviation.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/booking" className="btn-primary">
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">What Our Clients Say</h2>
            <p className="paragraph max-w-3xl mx-auto">
              Hear from our satisfied clients about their experience with PJ Charter's premium private jet services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-bold">James Davidson</h4>
                  <p className="text-sm text-secondary-600">CEO, Tech Innovations</p>
                </div>
              </div>
              <p className="text-secondary-700 italic">
                "PJ Charter has transformed how our executive team travels. The time savings and flexibility have been invaluable to our business operations."
              </p>
              <div className="mt-4 flex text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold">SM</span>
                </div>
                <div>
                  <h4 className="font-bold">Sarah Mitchell</h4>
                  <p className="text-sm text-secondary-600">Luxury Travel Enthusiast</p>
                </div>
              </div>
              <p className="text-secondary-700 italic">
                "The level of service provided by PJ Charter is unmatched. From the booking process to the in-flight experience, every detail was perfect."
              </p>
              <div className="mt-4 flex text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold">RB</span>
                </div>
                <div>
                  <h4 className="font-bold">Robert Brown</h4>
                  <p className="text-sm text-secondary-600">Event Coordinator</p>
                </div>
              </div>
              <p className="text-secondary-700 italic">
                "We used PJ Charter for our corporate retreat, and they exceeded all expectations. The group charter service was flawless."
              </p>
              <div className="mt-4 flex text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/testimonials" className="btn-secondary">
              Read More Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Latest News & Insights</h2>
            <p className="paragraph max-w-3xl mx-auto">
              Stay updated with the latest trends, news, and insights from the world of private aviation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 w-full">
                <ImageComponent 
                  src="/images/hero/services/services-1-desktop.jpg" 
                  alt="The Future of Sustainable Private Aviation"
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-secondary-500 mb-2">
                  <span>May 15, 2023</span>
                  <span className="mx-2">•</span>
                  <span>Private Aviation</span>
                </div>
                <h3 className="text-xl font-bold mb-2">The Future of Sustainable Private Aviation</h3>
                <p className="text-secondary-600 mb-4">
                  Exploring the latest advancements in sustainable fuel options and eco-friendly practices in private jet travel.
                </p>
                <Link href="/blog/sustainable-aviation" className="text-primary-600 hover:text-primary-800 font-medium">
                  Read More →
                </Link>
              </div>
            </div>
            
            {/* Blog Post 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 w-full">
                <ImageComponent 
                  src="/images/destinations/europe/united-kingdom/london/landmarks/landmarks-1-desktop.jpg" 
                  alt="Top 5 Private Jet Destinations for Summer 2023"
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-secondary-500 mb-2">
                  <span>April 28, 2023</span>
                  <span className="mx-2">•</span>
                  <span>Travel Tips</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Top 5 Private Jet Destinations for Summer 2023</h3>
                <p className="text-secondary-600 mb-4">
                  Discover the most exclusive and sought-after destinations for private jet travelers this summer season.
                </p>
                <Link href="/blog/summer-destinations" className="text-primary-600 hover:text-primary-800 font-medium">
                  Read More →
                </Link>
              </div>
            </div>
            
            {/* Blog Post 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 w-full">
                <ImageComponent 
                  src="/images/aircraft/gulfstream-g650/interior/interior-1-desktop.jpg" 
                  alt="Maximizing Productivity During Business Flights"
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-secondary-500 mb-2">
                  <span>April 10, 2023</span>
                  <span className="mx-2">•</span>
                  <span>Business Travel</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Maximizing Productivity During Business Flights</h3>
                <p className="text-secondary-600 mb-4">
                  Expert tips on how to make the most of your time while traveling for business on a private jet.
                </p>
                <Link href="/blog/business-productivity" className="text-primary-600 hover:text-primary-800 font-medium">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/blog" className="btn-secondary">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Ready to Experience Luxury Travel?</h2>
            <p className="text-lg mb-8 text-primary-100">
              Contact our team today to discuss your private jet charter needs and discover the PJ Charter difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="bg-white text-primary-700 hover:bg-primary-100 font-semibold py-3 px-6 rounded-md transition duration-300 text-center">
                Book Your Flight
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-primary-600 font-semibold py-3 px-6 rounded-md transition duration-300 text-center">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
