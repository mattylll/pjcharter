import fs from 'fs';
import path from 'path';
import { Location, Aircraft, Service, Route } from '@/lib/types';

/**
 * Load JSON data from a file
 * @param filename Name of the JSON file (without extension)
 * @returns Parsed JSON data
 */
export function loadJsonData<T>(filename: string): T[] {
  const filePath = path.join(process.cwd(), 'data', 'json', `${filename}.json`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as T[];
  } catch (error) {
    console.error(`Error loading data from ${filePath}:`, error);
    return [];
  }
}

/**
 * Load location data
 */
export function loadLocations(): Location[] {
  return loadJsonData<Location>('locations');
}

/**
 * Load aircraft data
 */
export function loadAircraft(): Aircraft[] {
  return loadJsonData<Aircraft>('aircraft');
}

/**
 * Load services data
 */
export function loadServices(): Service[] {
  return loadJsonData<Service>('services');
}

/**
 * Load routes data
 */
export function loadRoutes(): Route[] {
  return loadJsonData<Route>('routes');
}

/**
 * Get a single item by ID
 * @param items Array of items
 * @param id ID to find
 * @returns Item with matching ID or undefined
 */
export function getItemById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

/**
 * Get compatible aircraft for a route based on distance
 * @param routeDistance Distance of the route in km
 * @param aircraft Array of aircraft
 * @returns Array of compatible aircraft
 */
export function getCompatibleAircraft(routeDistance: number, aircraft: Aircraft[]): Aircraft[] {
  return aircraft.filter(a => a.range_km >= routeDistance);
}

/**
 * Get routes for a location
 * @param locationId Location ID
 * @param routes Array of routes
 * @returns Array of routes that include the location
 */
export function getRoutesForLocation(locationId: string, routes: Route[]): Route[] {
  return routes.filter(
    route => route.origin_id === locationId || route.destination_id === locationId
  );
}

/**
 * Get routes for an aircraft based on its range
 * @param aircraftRange Range of the aircraft in km
 * @param routes Array of routes
 * @returns Array of routes within the aircraft's range
 */
export function getRoutesForAircraft(aircraftRange: number, routes: Route[]): Route[] {
  return routes.filter(route => route.distance_km <= aircraftRange);
}

/**
 * Get services compatible with an aircraft
 * @param aircraftModel Aircraft model
 * @param services Array of services
 * @returns Array of compatible services
 */
export function getServicesForAircraft(aircraftModel: string, services: Service[]): Service[] {
  return services.filter(service => 
    service.suitable_aircraft.includes(aircraftModel)
  );
}
