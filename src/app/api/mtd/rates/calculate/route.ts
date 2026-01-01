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

    // Get response text and check content type
    const contentType = response.headers.get('content-type') || '';
    const responseText = await response.text();
    const trimmedText = responseText.trim();
    
    let data;
    
    // Check if response is HTML (error page)
    if (trimmedText.startsWith('<!DOCTYPE') || trimmedText.startsWith('<!doctype') || trimmedText.startsWith('<html')) {
      console.error('HTML response received instead of JSON:', trimmedText.substring(0, 200));
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid response from server. Please try again later.',
          details: 'Server returned HTML instead of JSON'
        },
        { status: 502 }
      );
    }
    
    // Try to parse as JSON
    try {
      data = JSON.parse(trimmedText);
    } catch (parseError) {
      // Only log if it's not empty
      if (trimmedText) {
        console.error('Failed to parse JSON response:', trimmedText.substring(0, 200));
        console.error('Parse error:', parseError);
      }
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid response from server. Please try again later.',
          details: 'Failed to parse server response'
        },
        { status: 502 }
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

