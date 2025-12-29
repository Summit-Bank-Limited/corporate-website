import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('https://products.summitbankng.com/mtd/mtd/rates', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control if needed
      cache: 'no-store', // or 'force-cache' for caching
    });

    // Get response text first to check if it's JSON
    const responseText = await response.text();
    let data;
    
    try {
      // Try to parse as JSON
      data = JSON.parse(responseText);
    } catch (parseError) {
      // If it's not JSON (likely HTML error page), return error
      console.error('Non-JSON response received:', responseText.substring(0, 200));
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid response from server. Please try again later.',
          details: response.status >= 500 ? 'Server error' : 'Unexpected response format'
        },
        { status: response.status >= 500 ? 502 : 500 }
      );
    }

    // Return the response with proper CORS headers
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching rates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rates' },
      { status: 500 }
    );
  }
}

