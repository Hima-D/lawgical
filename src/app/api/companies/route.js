import { NextResponse } from 'next/server';

const API_BASE_URLS = {
  companies: 'https://api.data.gov.in/resource/4dbe5667-7b6b-41d7-82af-211562424d9a',
  msme: 'https://api.data.gov.in/resource/8b68ae56-84cf-4728-a0a6-1be11028dea7',
};
const API_KEY = '579b464db66ec23bdd0000015225f8cfe51c499449eae355d713272c'; // Provided API key

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const apiType = searchParams.get('apiType') || 'companies';
  const format = searchParams.get('format') || 'json';
  const offset = searchParams.get('offset') || '0';
  const limit = searchParams.get('limit') || '100';
  const state = searchParams.get('filters[State]');
  const district = searchParams.get('filters[District]');

  // Validate parameters
  if (!['companies', 'msme'].includes(apiType)) {
    return NextResponse.json({ error: 'Invalid API type. Use companies or msme' }, { status: 400 });
  }
  if (!['json', 'xml', 'csv'].includes(format)) {
    return NextResponse.json({ error: 'Invalid format. Use json, xml, or csv' }, { status: 400 });
  }
  if (isNaN(offset) || offset < 0) {
    return NextResponse.json({ error: 'Invalid offset. Must be a non-negative integer' }, { status: 400 });
  }
  if (isNaN(limit) || limit < 1 || limit > 100) {
    return NextResponse.json({ error: 'Invalid limit. Must be between 1 and 100' }, { status: 400 });
  }
  if (apiType === 'msme' && (!state || !district)) {
    return NextResponse.json({ error: 'State and District are required for MSME API' }, { status: 400 });
  }

  // Build query string
  let queryParams = `api-key=${API_KEY}&format=${format}&offset=${offset}&limit=${limit}`;
  if (apiType === 'msme') {
    queryParams += `&filters[State]=${encodeURIComponent(state.toUpperCase())}&filters[District]=${encodeURIComponent(district.toUpperCase())}`;
  } else if (state) {
    queryParams += `&filters[CompanyStateCode]=${encodeURIComponent(state.toUpperCase())}`;
  }

  const externalUrl = `${API_BASE_URLS[apiType]}?${queryParams}`;

  try {
    const response = await fetch(externalUrl, {
      headers: {
        Accept: format === 'csv' ? 'text/csv' : `application/${format}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ error: errorData || `External API error: ${response.statusText}` }, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || '';
    if (format === 'csv' && contentType.includes('text/csv')) {
      const csvData = await response.text();
      return new NextResponse(csvData, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename=${apiType}.csv`,
        },
      });
    } else if (format === 'xml' && contentType.includes('application/xml')) {
      const xmlData = await response.text();
      return new NextResponse(xmlData, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    } else if (format === 'json' && contentType.includes('application/json')) {
      const jsonData = await response.json();
      return NextResponse.json(jsonData, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Unexpected content type from external API' }, { status: 500 });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}