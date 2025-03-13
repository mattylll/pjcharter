import { NextResponse } from 'next/server';
import { loadServices, getItemById } from '@/lib/utils/dataLoader';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  const category = searchParams.get('category');
  
  let services = loadServices();
  
  if (id) {
    const service = getItemById(services, id);
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json(service);
  }
  
  if (slug) {
    const service = services.find(s => s.slug === slug);
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json(service);
  }
  
  if (category) {
    services = services.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }
  
  return NextResponse.json(services);
}
