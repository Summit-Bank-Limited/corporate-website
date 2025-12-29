import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const amount = searchParams.get('amount');
    const tenor = searchParams.get('tenor');
    const effectiveDate = searchParams.get('effectiveDate');

    // Validate required parameters
    if (!amount || !tenor || !effectiveDate) {
      return NextResponse.json(
        { success: false, error: 'Amount, tenor, and effectiveDate are required' },
        { status: 400 }
      );
    }

    const url = `https://products.summitbankng.com/mtd/mtd/rates/calculate?amount=${amount}&tenor=${tenor}&effectiveDate=${effectiveDate}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
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
    console.error('Error calculating rate:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to calculate rate' },
      { status: 500 }
    );
  }
}

