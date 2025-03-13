import { NextResponse } from 'next/server';
import { loadAircraft, getItemById } from '@/lib/utils/dataLoader';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const category = searchParams.get('category');
  
  let aircraft = loadAircraft();
  
  if (id) {
    const singleAircraft = getItemById(aircraft, id);
    if (!singleAircraft) {
      return NextResponse.json({ error: 'Aircraft not found' }, { status: 404 });
    }
    return NextResponse.json(singleAircraft);
  }
  
  if (category) {
    aircraft = aircraft.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }
  
  return NextResponse.json(aircraft);
}
