import { Metadata } from 'next';
import Link from 'next/link';
import { loadServices } from '@/lib/utils/dataLoader';
import { Service } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Private Jet Charter Services | PJ Charter',
  description: 'Explore our comprehensive range of private jet charter services. From business travel to leisure trips, we offer tailored solutions for all your aviation needs.',
  keywords: 'private jet services, charter services, business travel, leisure travel, group charters, private aviation',
};

export default function ServicesPage() {
  const services = loadServices();
  
  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);
  
  // Define the order of categories
  const categoryOrder = ['Business', 'Leisure', 'Group', 'Specialized'];
  
  // Sort categories according to the defined order
  const sortedCategories = Object.keys(servicesByCategory).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );
  
  // Featured services (one from each category)
  const featuredServices = sortedCategories.map(category => 
    servicesByCategory[category][0]
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
              Our Private Jet Charter Services
            </h1>
            <p className="text-xl mb-8 text-secondary-200">
              Discover our comprehensive range of private jet charter services tailored to meet your specific travel requirements. From business trips to leisure getaways, we offer premium solutions for all your aviation needs.
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

      {/* Featured Services */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-2 mb-12 text-center">Featured Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service) => (
              <div key={service.id} className="bg-secondary-50 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                    {getCategoryIcon(service.category)}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-secondary-600 mb-4">
                    {service.description.substring(0, 120)}...
                  </p>
                  <Link href={`/services/${service.slug}`} className="text-primary-600 hover:text-primary-800 font-medium">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-12 text-center">Our Service Categories</h2>
          
          {sortedCategories.map((category) => (
            <div key={category} className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="heading-3">{category} Services</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesByCategory[category].map((service) => (
                  <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2">{service.name}</h4>
                      <p className="text-secondary-600 mb-4">
                        {service.description.substring(0, 120)}...
                      </p>
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-secondary-500 mb-2">Key Benefits:</h5>
                        <div className="flex flex-wrap gap-2">
                          {service.benefits.slice(0, 3).map((benefit, index) => (
                            <span key={index} className="inline-block bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded">
                              {benefit}
                            </span>
                          ))}
                          {service.benefits.length > 3 && (
                            <span className="inline-block bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded">
                              +{service.benefits.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <Link href={`/services/${service.slug}`} className="text-primary-600 hover:text-primary-800 font-medium">
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

      {/* Why Choose Our Services */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Why Choose Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Reason 1 */}
            <div className="bg-secondary-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Time Efficiency</h3>
              <p className="text-secondary-600">
                Save valuable time with our private jet services. Avoid long check-in lines, security delays, and boarding processes associated with commercial travel. Depart on your schedule, not the airline's.
              </p>
            </div>
            
            {/* Reason 2 */}
            <div className="bg-secondary-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Privacy & Comfort</h3>
              <p className="text-secondary-600">
                Enjoy complete privacy and exceptional comfort during your journey. Conduct confidential discussions, work productively, or simply relax in a luxurious environment tailored to your preferences.
              </p>
            </div>
            
            {/* Reason 3 */}
            <div className="bg-secondary-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Global Access</h3>
              <p className="text-secondary-600">
                Access thousands of airports worldwide that commercial airlines don't serve. Reach your destination directly, without connections or layovers, getting you closer to your final destination.
              </p>
            </div>
            
            {/* Reason 4 */}
            <div className="bg-secondary-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Experience</h3>
              <p className="text-secondary-600">
                Every aspect of your journey is tailored to your preferences. From catering to cabin configuration, we ensure your experience is customized to meet your specific requirements.
              </p>
            </div>
            
            {/* Reason 5 */}
            <div className="bg-secondary-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Cost Efficiency</h3>
              <p className="text-secondary-600">
                For group travel, our services can be cost-effective compared to multiple business or first-class commercial tickets. Maximize value with our transparent pricing and no hidden fees.
              </p>
            </div>
            
            {/* Reason 6 */}
            <div className="bg-secondary-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Service</h3>
              <p className="text-secondary-600">
                Experience attentive, personalized service throughout your journey. Our dedicated team ensures all your needs are met, providing a seamless and luxurious travel experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Service Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-secondary-800 text-white">
                  <th className="py-3 px-4 text-left">Service Feature</th>
                  <th className="py-3 px-4 text-center">Commercial First Class</th>
                  <th className="py-3 px-4 text-center">PJ Charter Service</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-secondary-200">
                  <td className="py-3 px-4 font-semibold">Check-in Time</td>
                  <td className="py-3 px-4 text-center">1-2 hours before departure</td>
                  <td className="py-3 px-4 text-center text-primary-600">15 minutes before departure</td>
                </tr>
                <tr className="border-b border-secondary-200">
                  <td className="py-3 px-4 font-semibold">Security Process</td>
                  <td className="py-3 px-4 text-center">Standard TSA procedures</td>
                  <td className="py-3 px-4 text-center text-primary-600">Expedited, private screening</td>
                </tr>
                <tr className="border-b border-secondary-200">
                  <td className="py-3 px-4 font-semibold">Schedule Flexibility</td>
                  <td className="py-3 px-4 text-center">Fixed airline schedule</td>
                  <td className="py-3 px-4 text-center text-primary-600">Fly on your schedule</td>
                </tr>
                <tr className="border-b border-secondary-200">
                  <td className="py-3 px-4 font-semibold">Airport Options</td>
                  <td className="py-3 px-4 text-center">Major airports only</td>
                  <td className="py-3 px-4 text-center text-primary-600">Access to 5,000+ airports</td>
                </tr>
                <tr className="border-b border-secondary-200">
                  <td className="py-3 px-4 font-semibold">Privacy</td>
                  <td className="py-3 px-4 text-center">Limited</td>
                  <td className="py-3 px-4 text-center text-primary-600">Complete privacy</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Personalization</td>
                  <td className="py-3 px-4 text-center">Minimal options</td>
                  <td className="py-3 px-4 text-center text-primary-600">Fully customized experience</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Ready to Experience Our Premium Services?</h2>
            <p className="text-lg mb-8 text-primary-100">
              Contact our team today to discuss your travel requirements and discover how our private jet charter services can elevate your travel experience.
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

// Helper function to get category icons
function getCategoryIcon(category: string) {
  switch (category) {
    case 'Business':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'Leisure':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'Group':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'Specialized':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
}
