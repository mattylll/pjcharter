export interface Location {
  id: string;
  city: string;
  country: string;
  region: string;
  airport_code: string;
  description: string;
  popular_routes: string[];
  latitude: number;
  longitude: number;
  image_url?: string;
}

export interface Aircraft {
  id: string;
  model: string;
  category: string;
  manufacturer: string;
  passenger_capacity: number;
  range_km: number;
  cruising_speed_kmh: number;
  luggage_capacity_kg: number;
  runway_requirement_m: number;
  description: string;
  amenities: string[];
  image_url?: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  benefits: string[];
  suitable_aircraft: string[];
  image_url?: string;
}

export interface Route {
  id: string;
  origin_id: string;
  destination_id: string;
  distance_km: number;
  flight_time_hours: number;
  popular_aircraft: string[];
  description: string;
  image_url?: string;
}
