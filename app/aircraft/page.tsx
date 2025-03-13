import { Metadata } from 'next';
import Link from 'next/link';
import { loadAircraft } from '../../lib/utils/dataLoader';
import { Aircraft } from '../../lib/types';

export const metadata: Metadata = {
  title: 'Private Jet Charter Aircraft | PJ Charter',
  description: 'Explore our fleet of private jets available for charter. From light jets to VIP airliners, find the perfect aircraft for your travel needs.',
  keywords: 'private jet charter, aircraft fleet, luxury jets, charter planes, private aviation',
};

export default function AircraftPage() {
  const aircraft = loadAircraft();
  
  // Group aircraft by category
  const aircraftByCategory = aircraft.reduce((acc, aircraft) => {
    if (!acc[aircraft.category]) {
      acc[aircraft.category] = [];
    }
    acc[aircraft.category].push(aircraft);
    return acc;
  }, {} as Record<string, Aircraft[]>);
  
  // Define the order of categories
  const categoryOrder = ['Light Jet', 'Midsize Jet', 'Heavy Jet', 'VIP Airliner'];
  
  // Sort categories according to the defined order
  const sortedCategories = Object.keys(aircraftByCategory).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
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
              Our Private Jet Fleet
            </h1>
            <p className="text-xl mb-8 text-secondary-200">
              Explore our extensive fleet of private jets available for charter. From light jets for short trips to VIP airliners for large groups, we have the perfect aircraft for your travel needs.
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

      {/* Category Navigation */}
      <section className="py-8 bg-white border-b border-secondary-200 sticky top-0 z-30">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {sortedCategories.map((category) => (
              <a 
                key={category} 
                href={`#${category.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 bg-secondary-50 hover:bg-primary-50 text-secondary-800 hover:text-primary-700 rounded-md transition duration-300"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Aircraft by Category */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-2 mb-12 text-center">Our Aircraft Fleet</h2>
          
          {sortedCategories.map((category) => (
            <div key={category} id={category.toLowerCase().replace(' ', '-')} className="mb-16 scroll-mt-24">
              <h3 className="heading-3 mb-6 pb-2 border-b border-secondary-200">{category}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {aircraftByCategory[category].map((aircraft) => (
                  <div key={aircraft.id} className="bg-secondary-50 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2">{aircraft.model}</h4>
                      <p className="text-sm text-secondary-600 mb-4">{aircraft.manufacturer}</p>
                      <p className="text-secondary-600 mb-4">
                        {aircraft.description.substring(0, 120)}...
                      </p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-secondary-100 p-2 rounded">
                          <span className="text-xs text-secondary-500">Passengers</span>
                          <p className="font-semibold">{aircraft.passenger_capacity}</p>
                        </div>
                        <div className="bg-secondary-100 p-2 rounded">
                          <span className="text-xs text-secondary-500">Range</span>
                          <p className="font-semibold">{aircraft.range_km} km</p>
                        </div>
                        <div className="bg-secondary-100 p-2 rounded">
                          <span className="text-xs text-secondary-500">Speed</span>
                          <p className="font-semibold">{aircraft.cruising_speed_kmh} km/h</p>
                        </div>
                        <div className="bg-secondary-100 p-2 rounded">
                          <span className="text-xs text-secondary-500">Luggage</span>
                          <p className="font-semibold">{aircraft.luggage_capacity_kg} kg</p>
                        </div>
                      </div>
                      <Link href={`/aircraft/${aircraft.id.toLowerCase()}`} className="text-primary-600 hover:text-primary-800 font-medium">
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Aircraft Comparison */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Aircraft Category Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-secondary-800 text-white">
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-center">Typical Passengers</th>
                  <th className="py-3 px-4 text-center">Average Range</th>
                  <th className="py-3 px-4 text-center">Typical Use Cases</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-secondary-200">
                  <td className="py-3 px-4 font-semibold">Light Jets</td>
                  <td className="py-3 px-4 text-center">4-8</td>
                  <td className="py-3 px-4 text-center">2,000-3,000 km</td>
                  <td className="py-3 px-4">Short trips, regional travel, small groups</td>
                  <td className="py-3 px-4 text-center">
                    <a href="#light-jet" className="text-primary-600 hover:text-primary-800">View Options</a>
                  </td>
                </tr>
                <tr className="border-b border-secondary-200">
                  <td className="py-3 px-4 font-semibold">Midsize Jets</td>
                  <td className="py-3 px-4 text-center">6-10</td>
                  <td className="py-3 px-4 text-center">3,000-5,500 km</td>
                  <td className="py-3 px-4">Medium-range flights, transcontinental travel</td>
                  <td className="py-3 px-4 text-center">
                    <a href="#midsize-jet" className="text-primary-600 hover:text-primary-800">View Options</a>
                  </td>
                </tr>
                <tr className="border-b border-secondary-200">
                  <td className="py-3 px-4 font-semibold">Heavy Jets</td>
                  <td className="py-3 px-4 text-center">8-18</td>
                  <td className="py-3 px-4 text-center">6,000-12,000 km</td>
                  <td className="py-3 px-4">Long-range international flights, larger groups</td>
                  <td className="py-3 px-4 text-center">
                    <a href="#heavy-jet" className="text-primary-600 hover:text-primary-800">View Options</a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">VIP Airliners</td>
                  <td className="py-3 px-4 text-center">15-50+</td>
                  <td className="py-3 px-4 text-center">8,000-12,000+ km</td>
                  <td className="py-3 px-4">Large groups, ultra-luxury travel, corporate events</td>
                  <td className="py-3 px-4 text-center">
                    <a href="#vip-airliner" className="text-primary-600 hover:text-primary-800">View Options</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">How to Choose the Right Aircraft</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Factors to Consider</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <span className="font-semibold">Number of Passengers:</span>
                    <p className="text-secondary-600">Ensure the aircraft has enough seating capacity for your group.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <span className="font-semibold">Flight Distance:</span>
                    <p className="text-secondary-600">Match the aircraft's range to your journey to avoid refueling stops.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <span className="font-semibold">Luggage Requirements:</span>
                    <p className="text-secondary-600">Consider the amount of luggage your group will bring.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <span className="font-semibold">Cabin Amenities:</span>
                    <p className="text-secondary-600">Determine which onboard features are important for your journey.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-secondary-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Our Recommendations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <span className="font-semibold">For Business Travel:</span>
                    <p className="text-secondary-600">Midsize jets offer a good balance of comfort, range, and amenities for business travelers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <span className="font-semibold">For Family Vacations:</span>
                    <p className="text-secondary-600">Heavy jets provide more space for families and their luggage on longer trips.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <span className="font-semibold">For Short Trips:</span>
                    <p className="text-secondary-600">Light jets are cost-effective for quick journeys between nearby cities.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div>
                    <span className="font-semibold">For Large Groups:</span>
                    <p className="text-secondary-600">VIP airliners accommodate larger parties while maintaining luxury amenities.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Ready to Book Your Private Jet?</h2>
            <p className="text-lg mb-8 text-primary-100">
              Contact our team today to discuss your aircraft preferences and travel requirements. We'll help you select the perfect jet for your journey.
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
