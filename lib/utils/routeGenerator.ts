import { loadLocations, loadAircraft, loadServices, loadRoutes } from './dataLoader';
import { Location, Aircraft, Service, Route } from '../types';

/**
 * Generate paths for dynamic routes
 * @param type Type of route to generate (locations, aircraft, services, routes)
 * @returns Array of paths for the dynamic route
 */
export function generatePaths(type: 'locations' | 'aircraft' | 'services' | 'routes'): { params: { slug: string } }[] {
  switch (type) {
    case 'locations':
      return generateLocationPaths();
    case 'aircraft':
      return generateAircraftPaths();
    case 'services':
      return generateServicePaths();
    case 'routes':
      return generateRoutePaths();
    default:
      return [];
  }
}

/**
 * Generate paths for location pages
 */
function generateLocationPaths(): { params: { slug: string } }[] {
  const locations = loadLocations();
  return locations.map(location => ({
    params: { slug: location.id.toLowerCase() }
  }));
}

/**
 * Generate paths for aircraft pages
 */
function generateAircraftPaths(): { params: { slug: string } }[] {
  const aircraft = loadAircraft();
  return aircraft.map(aircraft => ({
    params: { slug: aircraft.id.toLowerCase() }
  }));
}

/**
 * Generate paths for service pages
 */
function generateServicePaths(): { params: { slug: string } }[] {
  const services = loadServices();
  return services.map(service => ({
    params: { slug: service.slug }
  }));
}

/**
 * Generate paths for route pages
 */
function generateRoutePaths(): { params: { slug: string } }[] {
  const routes = loadRoutes();
  return routes.map(route => ({
    params: { slug: route.id.toLowerCase() }
  }));
}

/**
 * Generate metadata for a location page
 * @param location Location data
 * @returns Metadata object
 */
export function generateLocationMetadata(location: Location) {
  return {
    title: `Private Jet Charter in ${location.city}, ${location.country} | PJ Charter`,
    description: `Luxury private jet charter services in ${location.city}. Book your private flight with PJ Charter for a premium travel experience to and from ${location.city}, ${location.country}.`,
    keywords: `private jet ${location.city}, charter flight ${location.city}, luxury travel ${location.city}, private aviation ${location.country}, ${location.airport_code} private jet`,
  };
}

/**
 * Generate metadata for an aircraft page
 * @param aircraft Aircraft data
 * @returns Metadata object
 */
export function generateAircraftMetadata(aircraft: Aircraft) {
  return {
    title: `${aircraft.model} Private Jet Charter | ${aircraft.category} | PJ Charter`,
    description: `Charter the ${aircraft.model} ${aircraft.category} for your next private flight. This ${aircraft.manufacturer} aircraft offers ${aircraft.passenger_capacity} passenger capacity and ${aircraft.range_km}km range.`,
    keywords: `${aircraft.model}, ${aircraft.manufacturer}, ${aircraft.category}, private jet charter, luxury aircraft, ${aircraft.passenger_capacity} passenger jet`,
  };
}

/**
 * Generate metadata for a service page
 * @param service Service data
 * @returns Metadata object
 */
export function generateServiceMetadata(service: Service) {
  return {
    title: `${service.name} | Private Jet Charter Services | PJ Charter`,
    description: `${service.description.substring(0, 150)}...`,
    keywords: `${service.name}, private jet charter, ${service.category} travel, luxury aviation, ${service.benefits.join(', ')}`,
  };
}

/**
 * Generate metadata for a route page
 * @param route Route data
 * @param originLocation Origin location
 * @param destinationLocation Destination location
 * @returns Metadata object
 */
export function generateRouteMetadata(route: Route, originLocation: Location, destinationLocation: Location) {
  return {
    title: `Private Jet Charter from ${originLocation.city} to ${destinationLocation.city} | PJ Charter`,
    description: `Luxury private jet charter from ${originLocation.city} to ${destinationLocation.city}. Book your direct flight with PJ Charter for a premium travel experience between ${originLocation.city} and ${destinationLocation.city}.`,
    keywords: `private jet ${originLocation.city} to ${destinationLocation.city}, charter flight ${originLocation.airport_code} to ${destinationLocation.airport_code}, luxury travel ${originLocation.country} to ${destinationLocation.country}`,
  };
}
