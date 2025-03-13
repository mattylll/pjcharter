import { Metadata } from 'next';
import Link from 'next/link';
import { loadRoutes, loadLocations, getItemById } from '../../lib/utils/dataLoader';
import { Route, Location } from '../../lib/types';

export const metadata: Metadata = {
  title: 'Private Jet Charter Routes | PJ Charter',
  description: 'Explore our private jet charter routes connecting major cities worldwide. Find direct flights with luxury service for business and leisure travel.',
  keywords: 'private jet routes, charter flight paths, luxury travel routes, private aviation destinations',
};

export default function RoutesPage() {
  const routes = loadRoutes();
  const locations = loadLocations();
  
  // Get route details with location information
  const routesWithDetails = routes.map(route => {
    const origin = getItemById(locations, route.origin_id);
    const destination = getItemById(locations, route.destination_id);
    
    return {
      ...route,
      origin,
      destination,
    };
  });
  
  // Group routes by region
  const routesByRegion = routesWithDetails.reduce((acc, route) => {
    if (!route.origin || !route.destination) return acc;
    
    const region = route.origin.region === route.destination.region 
      ? `${route.origin.region} (Domestic)` 
      : `${route.origin.region} to ${route.destination.region}`;
    
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(route);
    return acc;
  }, {} as Record<string, (Route & { origin?: Location, destination?: Location })[]>);
  
  // Sort regions alphabetically
  const sortedRegions = Object.keys(routesByRegion).sort();
  
  // Get popular routes (for example, those with the shortest flight times)
  const popularRoutes = [...routesWithDetails]
    .filter(route => route.origin && route.destination)
    .sort((a, b) => a.flight_time_hours - b.flight_time_hours)
    .slice(0, 6);
  
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
              Private Jet Charter Routes
            </h1>
            <p className="text-xl mb-8 text-secondary-200">
              Explore our extensive network of private jet charter routes connecting major cities worldwide. Enjoy direct flights with premium service and unparalleled comfort.
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

      {/* Popular Routes */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-2 mb-12 text-center">Popular Routes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularRoutes.map((route) => {
              if (!route.origin || !route.destination) return null;
              
              return (
                <div key={route.id} className="bg-secondary-50 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {route.origin.city} to {route.destination.city}
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
                        {route.origin.airport_code} → {route.destination.airport_code}
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
        </div>
      </section>

      {/* Routes by Region */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-12 text-center">Routes by Region</h2>
          
          {sortedRegions.map((region) => (
            <div key={region} className="mb-16">
              <h3 className="heading-3 mb-6 pb-2 border-b border-secondary-200">{region}</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-secondary-800 text-white">
                      <th className="py-3 px-4 text-left">Route</th>
                      <th className="py-3 px-4 text-center">Distance</th>
                      <th className="py-3 px-4 text-center">Flight Time</th>
                      <th className="py-3 px-4 text-center">Popular Aircraft</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routesByRegion[region].map((route) => {
                      if (!route.origin || !route.destination) return null;
                      
                      return (
                        <tr key={route.id} className="border-b border-secondary-200 hover:bg-secondary-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-semibold">{route.origin.city} to {route.destination.city}</div>
                            <div className="text-sm text-secondary-500">{route.origin.airport_code} → {route.destination.airport_code}</div>
                          </td>
                          <td className="py-3 px-4 text-center">{route.distance_km} km</td>
                          <td className="py-3 px-4 text-center">{route.flight_time_hours} hours</td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex flex-wrap justify-center gap-1">
                              {route.popular_aircraft.slice(0, 2).map((aircraft, index) => (
                                <span key={index} className="inline-block bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded">
                                  {aircraft}
                                </span>
                              ))}
                              {route.popular_aircraft.length > 2 && (
                                <span className="inline-block bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded">
                                  +{route.popular_aircraft.length - 2} more
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Link href={`/routes/${route.id.toLowerCase()}`} className="text-primary-600 hover:text-primary-800 font-medium">
                              View Details
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Route Search */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Find Your Route</h2>
          
          <div className="max-w-3xl mx-auto bg-secondary-50 p-8 rounded-lg shadow-md">
            <p className="text-center text-secondary-600 mb-8">
              Looking for a specific route? Contact our team for personalized assistance in planning your private jet charter journey.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Custom Routes</h3>
                <p className="text-secondary-600 mb-4">
                  Don't see your desired route listed? We can arrange custom charter flights to virtually any destination worldwide. Our extensive network allows us to serve even the most remote locations.
                </p>
                <Link href="/contact" className="text-primary-600 hover:text-primary-800 font-medium">
                  Request a Custom Route →
                </Link>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Route Planning Assistance</h3>
                <p className="text-secondary-600 mb-4">
                  Our experienced team can help you plan complex itineraries with multiple stops, accommodating your schedule and preferences for a seamless travel experience.
                </p>
                <Link href="/booking" className="text-primary-600 hover:text-primary-800 font-medium">
                  Start Planning Your Journey →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Benefits of Our Charter Routes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Direct Connections</h3>
              <p className="text-secondary-600">
                Enjoy direct flights between destinations without layovers or connections, saving valuable time and eliminating the stress of traditional air travel.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Access to More Destinations</h3>
              <p className="text-secondary-600">
                Our routes connect to thousands of airports worldwide, including smaller airfields closer to your final destination that commercial airlines don't serve.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-secondary-600">
                Fly on your schedule, not the airline's. Our routes operate according to your preferred departure times, with the ability to accommodate last-minute changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Ready to Experience Premium Air Travel?</h2>
            <p className="text-lg mb-8 text-primary-100">
              Contact our team today to book your private jet charter on any of our routes or to inquire about custom flight options.
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
