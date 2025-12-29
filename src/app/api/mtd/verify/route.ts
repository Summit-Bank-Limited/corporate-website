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

    const response = await fetch('https://products.summitbankng.com/mtd/mtd/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountNumber, bvn }),
    });

    const data = await response.json();

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
    console.error('Error verifying account:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify account' },
      { status: 500 }
    );
  }
}

