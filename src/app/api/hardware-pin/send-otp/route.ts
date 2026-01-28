import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 
  'https://products.summitbankng.com';

export async function POST(request: NextRequest) {
  console.log('[send-otp] POST request received');
  console.log('[send-otp] API_BASE_URL from env:', process.env.NEXT_PUBLIC_API_BASE_URL || 'NOT SET (using default)');
  console.log('[send-otp] Final API_BASE_URL:', API_BASE_URL);
  try {
    const body = await request.json();
    console.log('[send-otp] Request body:', { customer_id: body.customer_id ? '***provided***' : 'missing' });
    const { customer_id } = body;

    if (!customer_id) {
      console.error('[send-otp] Customer ID is missing');
      return NextResponse.json(
        { success: false, error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const apiUrl = `${API_BASE_URL}/mtd/hardware-pin/send-otp`;
    console.log('[send-otp] Calling API:', apiUrl);
    console.log('[send-otp] Request payload:', { customer_id });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer_id }),
    });

    console.log('[send-otp] API response status:', response.status);
    console.log('[send-otp] API response ok:', response.ok);

    const responseText = await response.text();
    console.log('[send-otp] API response text:', responseText.substring(0, 200));

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('[send-otp] API response parsed successfully');
    } catch (parseError) {
      console.error('[send-otp] Failed to parse API response as JSON:', parseError);
      throw new Error(`Invalid JSON response from API: ${responseText.substring(0, 100)}`);
    }

    console.log('[send-otp] Returning response with status:', response.status);
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('[send-otp] Error occurred:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error && 'cause' in error ? error.cause : undefined
    });
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send OTP' 
      },
      { status: 500 }
    );
  }
}

