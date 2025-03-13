import { processCommaSeparatedField } from './csvToJson';

/**
 * Processes a location row from CSV
 */
export function processLocationRow(row: any): any {
  return {
    ...row,
    popular_routes: processCommaSeparatedField(row.popular_routes),
    latitude: parseFloat(row.latitude),
    longitude: parseFloat(row.longitude),
  };
}

/**
 * Processes an aircraft row from CSV
 */
export function processAircraftRow(row: any): any {
  return {
    ...row,
    passenger_capacity: parseInt(row.passenger_capacity, 10),
    range_km: parseInt(row.range_km, 10),
    cruising_speed_kmh: parseInt(row.cruising_speed_kmh, 10),
    luggage_capacity_kg: parseInt(row.luggage_capacity_kg, 10),
    runway_requirement_m: parseInt(row.runway_requirement_m, 10),
    amenities: processCommaSeparatedField(row.amenities),
  };
}

/**
 * Processes a service row from CSV
 */
export function processServiceRow(row: any): any {
  return {
    ...row,
    benefits: processCommaSeparatedField(row.benefits),
    suitable_aircraft: processCommaSeparatedField(row.suitable_aircraft),
  };
}

/**
 * Processes a route row from CSV
 */
export function processRouteRow(row: any): any {
  return {
    ...row,
    distance_km: parseInt(row.distance_km, 10),
    flight_time_hours: parseFloat(row.flight_time_hours),
    popular_aircraft: processCommaSeparatedField(row.popular_aircraft),
  };
}

/**
 * Returns an object mapping file names to their processor functions
 */
export function getProcessors(): Record<string, (row: any) => any> {
  return {
    locations: processLocationRow,
    aircraft: processAircraftRow,
    services: processServiceRow,
    routes: processRouteRow,
  };
}
