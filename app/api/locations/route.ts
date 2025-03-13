import { NextResponse } from 'next/server';
import { loadLocations, getItemById } from '../../../lib/utils/dataLoader';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  const locations = loadLocations();
  
  if (id) {
    const location = getItemById(locations, id);
    if (!location) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }
    return NextResponse.json(location);
  }
  
  return NextResponse.json(locations);
}
