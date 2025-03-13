import { Metadata } from 'next';
import Link from 'next/link';
import { loadLocations } from '../../lib/utils/dataLoader';
import { Location } from '../../lib/types';

export const metadata: Metadata = {
  title: 'Private Jet Charter Destinations | PJ Charter',
  description: 'Explore our worldwide private jet charter destinations. Luxury travel to major cities and exclusive locations with PJ Charter\'s premium service.',
  keywords: 'private jet destinations, charter flight locations, luxury travel destinations, private aviation routes',
};

export default function DestinationsPage() {
  const locations = loadLocations();
  
  // Group locations by region
  const locationsByRegion = locations.reduce((acc, location) => {
    if (!acc[location.region]) {
      acc[location.region] = [];
    }
    acc[location.region].push(location);
    return acc;
  }, {} as Record<string, Location[]>);
  
  // Sort regions alphabetically
  const sortedRegions = Object.keys(locationsByRegion).sort();
  
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
              Private Jet Charter Destinations
            </h1>
            <p className="text-xl mb-8 text-secondary-200">
              Explore our worldwide network of private jet charter destinations. From major business hubs to exclusive leisure locations, PJ Charter connects you to the world in luxury and style.
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

      {/* Destinations by Region */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-2 mb-12 text-center">Our Global Destinations</h2>
          
          {sortedRegions.map((region) => (
            <div key={region} className="mb-16">
              <h3 className="heading-3 mb-6 pb-2 border-b border-secondary-200">{region}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {locationsByRegion[region].map((location) => (
                  <div key={location.id} className="bg-secondary-50 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2">{location.city}, {location.country}</h4>
                      <p className="text-secondary-600 mb-4">
                        {location.description.substring(0, 120)}...
                      </p>
                      <div className="flex items-center text-sm text-secondary-500 mb-4">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                          {location.airport_code}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {location.region}
                        </span>
                      </div>
                      <Link href={`/destinations/${location.id.toLowerCase()}`} className="text-primary-600 hover:text-primary-800 font-medium">
                        Explore {location.city} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Popular Private Jet Routes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">London to New York</h3>
                <p className="text-secondary-600 mb-4">
                  One of the most popular transatlantic business routes, connecting two major financial centers. Private jets offer significant time savings with direct flights.
                </p>
                <Link href="/routes/lon-nyc" className="text-primary-600 hover:text-primary-800 font-medium">
                  View Route Details →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Paris to Nice</h3>
                <p className="text-secondary-600 mb-4">
                  A popular route for business travelers and vacationers heading to the French Riviera. Private jets offer quick and convenient access to the Côte d'Azur.
                </p>
                <Link href="/routes/par-nic" className="text-primary-600 hover:text-primary-800 font-medium">
                  View Route Details →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">New York to Miami</h3>
                <p className="text-secondary-600 mb-4">
                  Popular year-round, especially during winter months. Private jets offer direct flights between Teterboro and Opa-locka Executive Airport.
                </p>
                <Link href="/routes/nyc-mia" className="text-primary-600 hover:text-primary-800 font-medium">
                  View Route Details →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/routes" className="btn-secondary">
              View All Routes
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
  );
}
