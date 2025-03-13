import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadServices, loadAircraft, getServicesForAircraft } from '../../../lib/utils/dataLoader';
import { generateServiceMetadata } from '../../../lib/utils/routeGenerator';
import { Service, Aircraft } from '../../../lib/types';

// Generate static paths for all services
export async function generateStaticParams() {
  const services = loadServices();
  
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const services = loadServices();
  const service = services.find(s => s.slug === params.slug);
  
  if (!service) {
    return {
      title: 'Service Not Found | PJ Charter',
      description: 'The requested service could not be found.',
    };
  }
  
  return generateServiceMetadata(service);
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const services = loadServices();
  const service = services.find(s => s.slug === params.slug);
  
  if (!service) {
    notFound();
  }
  
  const allAircraft = loadAircraft();
  
  // Get suitable aircraft for this service
  const suitableAircraft = allAircraft.filter(aircraft => 
    service.suitable_aircraft.includes(aircraft.model)
  );
  
  // Get related services in the same category
  const relatedServices = services.filter(s => 
    s.category === service.category && s.id !== service.id
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
              {service.name}
            </h1>
            <p className="text-xl mb-8 text-secondary-200">
              Premium private jet charter services tailored for {service.name.toLowerCase()}. Experience luxury, comfort, and efficiency with PJ Charter.
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

      {/* Service Information */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="heading-2 mb-6">About Our {service.name} Service</h2>
              <div className="prose max-w-none">
                <p className="paragraph mb-4">
                  {service.description}
                </p>
                <p className="paragraph mb-4">
                  At PJ Charter, we understand the unique requirements of {service.name.toLowerCase()}. Our dedicated team works closely with you to ensure every aspect of your journey is tailored to your specific needs, providing a seamless and luxurious travel experience.
                </p>
                <p className="paragraph">
                  Whether you're traveling for {service.category.toLowerCase()} purposes or seeking a premium travel experience, our {service.name.toLowerCase()} service offers the flexibility, comfort, and efficiency that commercial airlines simply cannot match.
                </p>
              </div>
            </div>
            <div className="bg-secondary-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Service Highlights</h3>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Key Benefits of Our {service.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">{benefit}</h3>
                </div>
                <p className="text-secondary-600">
                  {getBenefitDescription(benefit, service.name)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Aircraft */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">Recommended Aircraft for {service.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suitableAircraft.slice(0, 3).map((aircraft) => (
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
          
          {suitableAircraft.length > 3 && (
            <div className="text-center mt-10">
              <Link href="/aircraft" className="btn-secondary">
                View All Aircraft
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-8 text-center">How Our {service.name} Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p className="text-secondary-600">
                Reach out to our team with your {service.name.toLowerCase()} requirements. We'll discuss your needs, preferences, and schedule.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Proposal</h3>
              <p className="text-secondary-600">
                We'll create a tailored proposal with aircraft options, itinerary details, and pricing based on your specific requirements.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Your Journey</h3>
              <p className="text-secondary-600">
                Once confirmed, we handle all the details. Simply arrive at the terminal and experience the luxury of private aviation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-2 mb-8 text-center">Related Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => (
                <div key={relatedService.id} className="bg-secondary-50 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{relatedService.name}</h3>
                    <p className="text-secondary-600 mb-4">
                      {relatedService.description.substring(0, 120)}...
                    </p>
                    <Link href={`/services/${relatedService.slug}`} className="text-primary-600 hover:text-primary-800 font-medium">
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Ready to Experience Our {service.name}?</h2>
            <p className="text-lg mb-8 text-primary-100">
              Contact our team today to discuss your {service.name.toLowerCase()} needs and discover the PJ Charter difference.
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

// Helper function to get benefit descriptions
function getBenefitDescription(benefit: string, serviceName: string): string {
  const descriptions: Record<string, string> = {
    'Time Efficiency': `Our ${serviceName} service saves you valuable time by eliminating long check-in lines, security delays, and boarding processes associated with commercial travel.`,
    'Flexible Scheduling': `With our ${serviceName} service, you set the departure time that works for your schedule, not the airline's. Changes can be accommodated with minimal notice.`,
    'Privacy and Confidentiality': `Enjoy complete privacy during your journey with our ${serviceName} service, allowing for confidential discussions and productive work time.`,
    'Productivity Enhancement': `Transform travel time into productive time with our ${serviceName} service. Work comfortably with high-speed Wi-Fi, meeting facilities, and a quiet environment.`,
    'Access to Multiple Destinations': `Our ${serviceName} service can access thousands of airports that commercial airlines don't serve, getting you closer to your final destination.`,
    'Customized Experience': `Every aspect of your journey with our ${serviceName} service is tailored to your preferences, from catering to cabin configuration.`,
    'Ultimate Comfort': `Experience unparalleled comfort with our ${serviceName} service, featuring luxurious seating, ample space, and premium amenities.`,
    'Personalized Service': `Enjoy attentive, personalized service throughout your journey with our ${serviceName} service, ensuring all your needs are met.`,
    'Access to Remote Destinations': `Our ${serviceName} service can reach remote or exclusive destinations that are inaccessible to commercial airlines.`,
    'Family-Friendly Experience': `Our ${serviceName} service offers a stress-free travel experience for families, with personalized attention and amenities for travelers of all ages.`,
    'Gourmet Catering': `Indulge in custom gourmet dining options during your flight with our ${serviceName} service, tailored to your preferences and dietary requirements.`,
    'Accommodates Large Groups': `Our ${serviceName} service can accommodate large groups comfortably, ensuring everyone travels together without the constraints of commercial airline seating.`,
    'Custom Itineraries': `We create bespoke travel itineraries for our ${serviceName} service, designed around your group's specific schedule and requirements.`,
    'Event Coordination': `Our ${serviceName} service includes comprehensive event coordination, ensuring seamless transportation for all participants.`,
    'Cost-Effective for Groups': `When traveling as a group, our ${serviceName} service can be cost-effective compared to multiple business or first-class commercial tickets.`,
    'Consistent Experience': `Our ${serviceName} service ensures a consistent, high-quality experience for all passengers across multiple flights or locations.`,
    'Swift Response': `Our ${serviceName} service offers rapid response times, with aircraft ready to depart with minimal notice when urgent travel is required.`,
    'Medical Equipment Integration': `Our ${serviceName} service accommodates specialized medical equipment and ensures it's properly secured and operational during flight.`,
    'Comfortable Patient Transport': `We prioritize patient comfort with our ${serviceName} service, with cabin configurations that can include stretchers or specialized seating as needed.`,
    'Global Coverage': `Our ${serviceName} service offers worldwide coverage, ensuring you can reach your destination regardless of location.`,
    'Coordination with Medical Facilities': `Our ${serviceName} service includes coordination with medical facilities at both departure and arrival locations for seamless transfers.`,
    'Privacy and Dignity': `Our ${serviceName} service ensures patients travel with complete privacy and dignity, away from the public eye.`,
    'Coordinated Group Arrivals': `Our ${serviceName} service ensures all participants arrive together, coordinated for your event's schedule.`,
    'VIP Experience': `Provide attendees with a premium travel experience as part of your event with our ${serviceName} service.`,
    'Custom Branding Options': `Our ${serviceName} service offers branding opportunities for corporate events, including custom welcome materials and branded elements.`,
    'Dedicated Event Coordinator': `A dedicated coordinator for our ${serviceName} service works with your event team to ensure perfect synchronization of travel and event schedules.`,
    'Efficient Multi-City Itineraries': `Our ${serviceName} service optimizes complex multi-city schedules, maximizing your productive time and minimizing travel time.`,
    'Consistent Experience Across Destinations': `Enjoy the same high level of service across all locations with our ${serviceName} service, regardless of where your roadshow takes you.`,
    'Onboard Meeting Capabilities': `Conduct meetings or presentations between destinations with our ${serviceName} service's onboard facilities.`,
    'Schedule Flexibility': `Our ${serviceName} service adapts to changing schedules and last-minute adjustments that are common during roadshows and multi-city tours.`,
    'Ultimate Privacy': `Begin your married life in complete privacy with our ${serviceName} service, away from the crowds of commercial travel.`,
    'Romantic Atmosphere': `Our ${serviceName} service creates a romantic atmosphere with special touches like champagne service, flowers, and personalized amenities.`,
    'Champagne and Gourmet Dining': `Celebrate your new journey together with premium champagne and gourmet dining options on our ${serviceName} service.`,
    'Child-Friendly Amenities': `Our ${serviceName} service includes amenities specifically for children, ensuring a comfortable and enjoyable journey for young travelers.`,
    'Spacious Cabins': `Enjoy ample space for your family to move around and relax during the flight with our ${serviceName} service.`,
    'Family Meal Options': `Our ${serviceName} service offers child-friendly meal options alongside adult gourmet selections to satisfy all family members.`,
    'Entertainment for All Ages': `Keep everyone entertained with our ${serviceName} service's entertainment options suitable for all age groups.`,
    'Pet-Friendly Options': `Bring your furry family members along with our pet-friendly ${serviceName} service options.`,
    'Assistance with Family Logistics': `Our ${serviceName} service includes assistance with the logistics of family travel, from luggage handling to ground transportation.`,
    'Equipment Accommodation': `Our ${serviceName} service has ample space for sports equipment, uniforms, and team supplies.`,
    'Nutrition-Focused Catering': `Our ${serviceName} service offers specialized catering options designed for athletes' nutritional needs.`,
    'Team Seating Arrangements': `Our ${serviceName} service configures cabin seating to accommodate team dynamics and coaching staff requirements.`,
    'Schedule Flexibility for Competitions': `Our ${serviceName} service adapts to competition schedules, including delays or changes to tournament timelines.`,
    'Recovery-Optimized Cabin Environment': `Our ${serviceName} service creates an optimal environment for athlete recovery during travel with adjustable lighting, temperature, and humidity.`,
    'Global Tournament Coverage': `Our ${serviceName} service can transport teams to tournaments worldwide, with expertise in handling international sports travel logistics.`,
    'Enhanced Security': `Our ${serviceName} service includes additional security measures for high-profile individuals, ensuring privacy and safety.`,
    'Discreet Ground Handling': `Our ${serviceName} service provides discreet arrival and departure procedures, avoiding public terminals and media exposure.`,
    'Customized Luxury Experience': `Our ${serviceName} service offers the highest level of luxury and personalization for discerning high-profile travelers.`,
    'Global Coverage with Short Notice': `Our ${serviceName} service can arrange travel worldwide with minimal notice, accommodating the dynamic schedules of high-profile individuals.`,
    'Media Avoidance': `Our ${serviceName} service includes strategies to avoid media attention and maintain privacy throughout the journey.`,
  };
  
  return descriptions[benefit] || `Our ${serviceName} service provides ${benefit.toLowerCase()} to enhance your private jet charter experience.`;
}
