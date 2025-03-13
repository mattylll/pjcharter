import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadRoutes, loadLocations, loadAircraft, getItemById, getCompatibleAircraft } from '@/lib/utils/dataLoader';
import { generateRouteMetadata } from '@/lib/utils/routeGenerator';
import { Route, Location, Aircraft } from '@/lib/types';

// Generate static paths for all routes
export async function generateStaticParams() {
  const routes = loadRoutes();
  
  return routes.map((route) => ({
    slug: route.id.toLowerCase(),
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const routes = loadRoutes();
  const route = routes.find(r => r.id.toLowerCase() === params.slug.toLowerCase());
  
  if (!route) {
    return {
      title: 'Route Not Found | PJ Charter',
      description: 'The requested route could not be found.',
    };
  }
  
  const locations = loadLocations();
  const originLocation = getItemById(locations, route.origin_id);
  const destinationLocation = getItemById(locations, route.destination_id);
  
  if (!originLocation || !destinationLocation) {
    return {
      title: 'Route Details | PJ Charter',
      description: 'Private jet charter route details.',
    };
  }
  
  return generateRouteMetadata(route, originLocation, destinationLocation);
}

export default function RoutePage({ params }: { params: { slug: string } }) {
  const routes = loadRoutes();
  const route = routes.find(r => r.id.toLowerCase() === params.slug.toLowerCase());
  
  if (!route) {
    notFound();
  }
  
  const locations = loadLocations();
  const originLocation = getItemById(locations, route.origin_id);
  const destinationLocation = getItemById(locations, route.destination_id);
  
  if (!originLocation || !destinationLocation) {
    notFound();
  }
  
  const allAircraft = loadAircraft();
  const compatibleAircraft = getCompatibleAircraft(route.distance_km, allAircraft);
  
  // Get popular aircraft for this route
  const popularAircraft = allAircraft.filter(a => 
    route.popular_aircraft.includes(a.model)
  );
  
  // Calculate estimated flight cost range (simplified example)
  const minCostPerKm = 5; // Example value in currency units per km
  const maxCostPerKm = 15; // Example value in currency units per km
  const minEstimatedCost = Math.round(route.distance_km * minCostPerKm / 100) * 100;
  const maxEstimatedCost = Math.round(route.distance_km * maxCostPerKm / 100) * 100;
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-secondary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          {/* Replace with actual image later */}
          <div className="w-full h-full bg-gradient-to-r from-secondary-900 to-primary-900"></div>
        </div>
        <div className="container-custom relative z-10 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="heading-1 mb-6 font-serif">
              Private Jet Charter from {originLocation.city} to {destinationLocation.city}
            </h1>
            <p className="text-xl mb-8 text-secondary-200">
              Experience luxury travel between {originLocation.city} and {destinationLocation.city}. Book your private jet charter with PJ Charter for a premium, efficient journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking" className="btn-primary text-center">
                Book This Route
              </Link>
              <Link href="/contact" className="bg-white text-secondary-900 hover:bg-secondary-100 font-semibold py-2 px-4 rounded-md transition duration-300 text-center">
                Request Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Route Information */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="heading-2 mb-6">About This Route</h2>
              <div className="prose max-w-none">
                <p className="paragraph mb-4">
                  {route.description}
                </p>
                <p className="paragraph mb-4">
                  The flight from {originLocation.city} ({originLocation.airport_code}) to {destinationLocation.city} ({destinationLocation.airport_code}) covers a distance of {route.distance_km} kilometers and typically takes around {route.flight_time_hours} hours on a private jet.
                </p>
                <p className="paragraph">
                  This route is popular among both business and leisure travelers, offering significant time savings and convenience compared to commercial flights. With PJ Charter, you'll enjoy a seamless travel experience with personalized service and luxury amenities.
                </p>
              </div>
            </div>
            <div className="bg-secondary-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Route Details</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-semibold w-32">Origin:</span>
                  <span>{originLocation.city}, {originLocation.country} ({originLocation.airport_code})</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-32">Destination:</span>
                  <span>{destinationLocation.city}, {destinationLocation.country} ({destinationLocation.airport_code})</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-32">Distance:</span>
                  <span>{route.distance_km} km</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-32">Flight Time:</span>
                  <span>Approximately {route.flight_time_hours} hours</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-32">Est. Cost:</span>
                  <span>${minEstimatedCost.toLocaleString()} - ${maxEstimatedCost.toLocaleString()}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Route Map */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Route Map</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-96 bg-secondary-200 rounded-lg flex items-center justify-center mb-6">
              {/* Replace with actual map visualization */}
              <p className="text-secondary-600">Route Map Visualization</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Origin: {originLocation.city}</h3>
                <p className="text-secondary-600 mb-4">
                  {originLocation.description.substring(0, 200)}...
                </p>
                <Link href={`/destinations/${originLocation.id.toLowerCase()}`} className="text-primary-600 hover:text-primary-800 font-medium">
                  Learn More About {originLocation.city} →
                </Link>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Destination: {destinationLocation.city}</h3>
                <p className="text-secondary-600 mb-4">
                  {destinationLocation.description.substring(0, 200)}...
                </p>
                <Link href={`/destinations/${destinationLocation.id.toLowerCase()}`} className="text-primary-600 hover:text-primary-800 font-medium">
                  Learn More About {destinationLocation.city} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Aircraft */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Recommended Aircraft for This Route</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularAircraft.slice(0, 3).map((aircraft) => (
              <div key={aircraft.id} className="bg-secondary-50 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{aircraft.model}</h3>
                  <p className="text-sm text-secondary-600 mb-4">{aircraft.manufacturer}</p>
                  <p className="text-secondary-600 mb-4">
                    {aircraft.description.substring(0, 120)}...
                  </p>
                  <ul className="mb-4 space-y-2">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {aircraft.passenger_capacity} Passengers
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Range: {aircraft.range_km} km
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {aircraft.category}
                    </li>
                  </ul>
                  <Link href={`/aircraft/${aircraft.id.toLowerCase()}`} className="text-primary-600 hover:text-primary-800 font-medium">
                    View Aircraft Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/aircraft" className="btn-secondary">
              View All Aircraft
            </Link>
          </div>
        </div>
      </section>

      {/* Travel Information */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Travel Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Departure Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold block">Check-in Time</span>
                    <p className="text-secondary-600">Arrive just 15 minutes before your scheduled departure time.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold block">Security Screening</span>
                    <p className="text-secondary-600">Enjoy expedited, private security screening without the long lines.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold block">Terminal Facilities</span>
                    <p className="text-secondary-600">Access to exclusive private terminals with comfortable lounges and amenities.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Arrival Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold block">Customs & Immigration</span>
                    <p className="text-secondary-600">Expedited customs and immigration procedures for international flights.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold block">Ground Transportation</span>
                    <p className="text-secondary-600">Seamless connections with luxury ground transportation to your final destination.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold block">Personalized Assistance</span>
                    <p className="text-secondary-600">Dedicated staff to assist with luggage and any other requirements upon arrival.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">How to Book This Route</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p className="text-secondary-600">
                Reach out to our team with your travel requirements. We'll discuss your needs, preferences, and schedule for your journey from {originLocation.city} to {destinationLocation.city}.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Proposal</h3>
              <p className="text-secondary-600">
                We'll create a tailored proposal with aircraft options, itinerary details, and pricing based on your specific requirements for this route.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Your Journey</h3>
              <p className="text-secondary-600">
                Once confirmed, we handle all the details. Simply arrive at the terminal and experience the luxury of private aviation between {originLocation.city} and {destinationLocation.city}.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/booking" className="btn-primary">
              Book This Route Now
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Ready to Experience Luxury Travel from {originLocation.city} to {destinationLocation.city}?</h2>
            <p className="text-lg mb-8 text-primary-100">
              Contact our team today to book your private jet charter and discover the PJ Charter difference.
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
  );
}
