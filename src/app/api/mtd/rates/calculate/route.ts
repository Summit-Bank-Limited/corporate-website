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

    const data = await response.json();

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

