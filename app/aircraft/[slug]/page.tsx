import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadAircraft, loadRoutes, getItemById, getRoutesForAircraft } from '@/lib/utils/dataLoader';
import { generateAircraftMetadata } from '@/lib/utils/routeGenerator';
import { Aircraft, Route } from '@/lib/types';

// Generate static paths for all aircraft
export async function generateStaticParams() {
  const aircraft = loadAircraft();
  
  return aircraft.map((aircraft) => ({
    slug: aircraft.id.toLowerCase(),
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const allAircraft = loadAircraft();
  const aircraft = allAircraft.find(a => a.id.toLowerCase() === params.slug.toLowerCase());
  
  if (!aircraft) {
    return {
      title: 'Aircraft Not Found | PJ Charter',
      description: 'The requested aircraft could not be found.',
    };
  }
  
  return generateAircraftMetadata(aircraft);
}

export default function AircraftPage({ params }: { params: { slug: string } }) {
  const allAircraft = loadAircraft();
  const aircraft = allAircraft.find(a => a.id.toLowerCase() === params.slug.toLowerCase());
  
  if (!aircraft) {
    notFound();
  }
  
  const routes = loadRoutes();
  const compatibleRoutes = getRoutesForAircraft(aircraft.range_km, routes);
  
  // Get similar aircraft in the same category
  const similarAircraft = allAircraft.filter(a => 
    a.category === aircraft.category && a.id !== aircraft.id
  ).slice(0, 3);
  
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
              {aircraft.model} Private Jet Charter
            </h1>
            <p className="text-xl mb-8 text-secondary-200">
              Experience luxury travel with the {aircraft.manufacturer} {aircraft.model}. This premium {aircraft.category.toLowerCase()} offers exceptional comfort and performance for your private jet charter needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking" className="btn-primary text-center">
                Book This Aircraft
              </Link>
              <Link href="/contact" className="bg-white text-secondary-900 hover:bg-secondary-100 font-semibold py-2 px-4 rounded-md transition duration-300 text-center">
                Request Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Aircraft Information */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="heading-2 mb-6">About the {aircraft.model}</h2>
              <div className="prose max-w-none">
                <p className="paragraph mb-4">
                  {aircraft.description}
                </p>
                <p className="paragraph mb-4">
                  The {aircraft.model} by {aircraft.manufacturer} is a {aircraft.category.toLowerCase()} private jet that offers an exceptional balance of performance, comfort, and efficiency. With its impressive range of {aircraft.range_km} kilometers and cruising speed of {aircraft.cruising_speed_kmh} km/h, this aircraft is perfect for both short and long-distance travel.
                </p>
                <p className="paragraph">
                  With a passenger capacity of {aircraft.passenger_capacity} and luggage capacity of {aircraft.luggage_capacity_kg} kg, the {aircraft.model} provides ample space for passengers and their belongings, making it an ideal choice for both business and leisure travel.
                </p>
              </div>
            </div>
            <div className="bg-secondary-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Aircraft Specifications</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-semibold w-32">Manufacturer:</span>
                  <span>{aircraft.manufacturer}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-32">Category:</span>
                  <span>{aircraft.category}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-32">Passengers:</span>
                  <span>{aircraft.passenger_capacity}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-32">Range:</span>
                  <span>{aircraft.range_km} km</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-32">Cruising Speed:</span>
                  <span>{aircraft.cruising_speed_kmh} km/h</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-32">Luggage:</span>
                  <span>{aircraft.luggage_capacity_kg} kg</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold w-32">Runway Needed:</span>
                  <span>{aircraft.runway_requirement_m} m</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Onboard Amenities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aircraft.amenities.map((amenity, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">{amenity}</h3>
                </div>
                <p className="text-secondary-600">
                  {getAmenityDescription(amenity)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Range Map */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Aircraft Range</h2>
          
          <div className="bg-secondary-50 p-6 rounded-lg mb-8">
            <div className="text-center mb-6">
              <p className="text-xl font-bold">Maximum Range: {aircraft.range_km} km</p>
              <p className="text-secondary-600">
                The {aircraft.model} can reach destinations up to {aircraft.range_km} kilometers away without refueling.
              </p>
            </div>
            
            <div className="h-64 bg-secondary-200 rounded-lg flex items-center justify-center">
              {/* Replace with actual range map visualization */}
              <p className="text-secondary-600">Range Map Visualization</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Sample Routes Within Range</h3>
              <ul className="space-y-3">
                {compatibleRoutes.slice(0, 5).map((route) => (
                  <li key={route.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <span>{route.id.toUpperCase().replace('-', ' → ')}</span>
                    <span className="text-secondary-600">{route.distance_km} km</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Flight Time Estimates</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span>Short Flights (under 1,000 km)</span>
                  <span className="text-secondary-600">1-2 hours</span>
                </li>
                <li className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span>Medium Flights (1,000-3,000 km)</span>
                  <span className="text-secondary-600">2-4 hours</span>
                </li>
                <li className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span>Long Flights (3,000-6,000 km)</span>
                  <span className="text-secondary-600">4-7 hours</span>
                </li>
                <li className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span>Ultra-Long Flights (6,000+ km)</span>
                  <span className="text-secondary-600">7+ hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Aircraft */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Similar Aircraft</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarAircraft.map((aircraft) => (
              <div key={aircraft.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
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
                  </ul>
                  <Link href={`/aircraft/${aircraft.id.toLowerCase()}`} className="text-primary-600 hover:text-primary-800 font-medium">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href={`/aircraft?category=${aircraft.category.toLowerCase()}`} className="btn-secondary">
              View All {aircraft.category} Aircraft
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Ready to Charter the {aircraft.model}?</h2>
            <p className="text-lg mb-8 text-primary-100">
              Contact our team today to book this aircraft for your next journey and experience the luxury of private aviation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="bg-white text-primary-700 hover:bg-primary-100 font-semibold py-3 px-6 rounded-md transition duration-300 text-center">
                Book This Aircraft
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

// Helper function to get amenity descriptions
function getAmenityDescription(amenity: string): string {
  const descriptions: Record<string, string> = {
    'Wi-Fi': 'Stay connected with high-speed Wi-Fi throughout your flight, allowing you to work, stream, or browse the internet.',
    'Leather Seats': 'Luxurious leather seats designed for maximum comfort during your journey.',
    'Refreshment Center': 'Access to a variety of beverages and snacks throughout your flight.',
    'Power Outlets': 'Convenient power outlets to keep your devices charged during the journey.',
    'Entertainment System': 'State-of-the-art entertainment system with a selection of movies, music, and more.',
    'Lavatory': 'Private lavatory facilities for your convenience during the flight.',
    'Full Refreshment Center': 'Comprehensive refreshment center with a wide selection of beverages and gourmet snacks.',
    'Full Lavatory': 'Spacious and well-appointed lavatory with premium amenities.',
    'Fold-out Tables': 'Convenient fold-out tables for dining or working during your flight.',
    'Full Galley': 'Complete galley for preparing and serving gourmet meals and refreshments.',
    'Advanced Entertainment System': 'Premium entertainment system with large screens, surround sound, and extensive media library.',
    'Sleeping Quarters': 'Dedicated sleeping area with comfortable bedding for restful travel on long flights.',
    'Shower': 'Private shower facilities for refreshing during long-haul flights.',
    'Conference Room': 'Dedicated space for meetings and conferences with business amenities.',
    'Master Bedroom': 'Luxurious private bedroom with en-suite facilities for ultimate comfort.',
    'Dining Area': 'Dedicated dining area for enjoying gourmet meals during your flight.',
    'Multiple Lavatories': 'Multiple lavatory facilities throughout the aircraft for passenger convenience.',
  };
  
  return descriptions[amenity] || `Enjoy the comfort and convenience of ${amenity} during your flight.`;
}
