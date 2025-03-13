import { NextResponse } from 'next/server';
import { loadRoutes, loadLocations, getItemById, getRoutesForLocation } from '../../../lib/utils/dataLoader';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const locationId = searchParams.get('location');
  
  const routes = loadRoutes();
  
  if (id) {
    const route = getItemById(routes, id);
    if (!route) {
      return NextResponse.json({ error: 'Route not found' }, { status: 404 });
    }
    return NextResponse.json(route);
  }
  
  if (origin && destination) {
    const filteredRoutes = routes.filter(
      r => r.origin_id === origin && r.destination_id === destination
    );
    return NextResponse.json(filteredRoutes);
  }
  
  if (locationId) {
    const locationRoutes = getRoutesForLocation(locationId, routes);
    return NextResponse.json(locationRoutes);
  }
  
  return NextResponse.json(routes);
}
