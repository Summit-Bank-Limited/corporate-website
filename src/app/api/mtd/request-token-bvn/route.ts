import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountNumber, bvn } = body;

    // Validate required fields
    if (!accountNumber || !bvn) {
      return NextResponse.json(
        { success: false, error: 'Account number and BVN are required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://products.summitbankng.com/mtd/request-token-bvn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountNumber, bvn }),
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
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error requesting token:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to request token' },
      { status: 500 }
    );
  }
}

