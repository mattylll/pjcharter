import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadLocations, loadRoutes, loadAircraft, getItemById, getRoutesForLocation } from '@/lib/utils/dataLoader';
import { generateLocationMetadata } from '@/lib/utils/routeGenerator';
import { Location, Route, Aircraft } from '@/lib/types';

// Generate static paths for all locations
export async function generateStaticParams() {
  const locations = loadLocations();
  
  return locations.map((location) => ({
    slug: location.id.toLowerCase(),
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const locations = loadLocations();
  const location = locations.find(loc => loc.id.toLowerCase() === params.slug.toLowerCase());
  
  if (!location) {
    return {
      title: 'Location Not Found | PJ Charter',
      description: 'The requested location could not be found.',
    };
  }
  
  return generateLocationMetadata(location);
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const locations = loadLocations();
  const location = locations.find(loc => loc.id.toLowerCase() === params.slug.toLowerCase());
  
  if (!location) {
    notFound();
  }
  
  const routes = loadRoutes();
  const locationRoutes = getRoutesForLocation(location.id, routes);
  const aircraft = loadAircraft();
  
  // Get origin and destination locations for each route
  const routesWithDetails = locationRoutes.map(route => {
    const originId = route.origin_id;
    const destinationId = route.destination_id;
    
    const origin = getItemById(locations, originId);
    const destination = getItemById(locations, destinationId);
    
    return {
      ...route,
      origin,
      destination,
    };
  });
  
  // Get popular aircraft for this location
  const popularAircraftModels = Array.from(
    new Set(
      locationRoutes.flatMap(route => route.popular_aircraft)
    )
  );
  
  const popularAircraft = aircraft.filter(a => 
    popularAircraftModels.includes(a.model)
  );
  
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
              Private Jet Charter in {location.city}, {location.country}
            </h1>
            <p className="text-xl mb-8 text-secondary-200">
              Luxury private jet charter services for business and leisure travel to and from {location.city}. Experience premium comfort and efficiency with PJ Charter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking" className="btn-primary text-center">
                Book Your Flight
              </Link>
              <Link href="/contact" className="bg-white text-secondary-900 hover:bg-secondary-100 font-semibold py-2 px-4 rounded-md transition duration-300 text-center">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Information */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="heading-2 mb-6">About {location.city}</h2>
              <div className="prose max-w-none">
                <p className="paragraph mb-4">
                  {location.description}
                </p>
                <p className="paragraph mb-4">
                  With PJ Charter, you can experience the ultimate in luxury travel to and from {location.city}. Our private jet charter services provide you with flexibility, comfort, and efficiency that commercial airlines simply cannot match.
                </p>
                <p className="paragraph">
                  {location.city} is served by {location.airport_code} airport, which offers excellent facilities for private jet travelers, including dedicated terminals and expedited customs clearance.
                </p>
              </div>
            </div>
            <div className="bg-secondary-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Location Details</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-semibold w-24">City:</span>
                  <span>{location.city}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-24">Country:</span>
                  <span>{location.country}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-24">Region:</span>
                  <span>{location.region}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-24">Airport:</span>
                  <span>{location.airport_code}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Popular Routes from {location.city}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {routesWithDetails.slice(0, 6).map((route) => {
              const otherLocation = route.origin_id === location.id ? route.destination : route.origin;
              if (!otherLocation) return null;
              
              return (
                <div key={route.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {route.origin_id === location.id ? 'To' : 'From'} {otherLocation.city}, {otherLocation.country}
                    </h3>
                    <div className="flex items-center text-sm text-secondary-500 mb-4">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {route.flight_time_hours} hours
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        {route.distance_km} km
                      </span>
                    </div>
                    <p className="text-secondary-600 mb-4">
                      {route.description.substring(0, 120)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary-600 font-semibold">
                        {route.origin_id === location.id ? `${location.airport_code} → ${otherLocation.airport_code}` : `${otherLocation.airport_code} → ${location.airport_code}`}
                      </span>
                      <Link href={`/routes/${route.id.toLowerCase()}`} className="text-primary-600 hover:text-primary-800 font-medium">
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {routesWithDetails.length > 6 && (
            <div className="text-center mt-10">
              <Link href={`/routes?location=${location.id}`} className="btn-secondary">
                View All Routes
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Recommended Aircraft */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Recommended Aircraft for {location.city}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularAircraft.slice(0, 3).map((aircraft) => (
              <div key={aircraft.id} className="bg-secondary-50 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{aircraft.model}</h3>
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

      {/* Call to Action */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Ready to Experience Luxury Travel to {location.city}?</h2>
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
  );
}
