import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountNumber, token, cardNumber, pin } = body;

    // Validate required fields
    if (!accountNumber || !token || !cardNumber || !pin) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://products.summitbankng.com/mtd/card-activation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountNumber, token, cardNumber, pin }),
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
    console.error('Error activating card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to activate card' },
      { status: 500 }
    );
  }
}

