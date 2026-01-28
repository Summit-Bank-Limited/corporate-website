import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 
  'https://products.summitbankng.com';

export async function POST(request: NextRequest) {
  console.log('[validate-otp] POST request received');
  console.log('[validate-otp] API_BASE_URL from env:', process.env.NEXT_PUBLIC_API_BASE_URL || 'NOT SET (using default)');
  console.log('[validate-otp] Final API_BASE_URL:', API_BASE_URL);
  try {
    const body = await request.json();
    console.log('[validate-otp] Request body:', { 
      customer_id: body.customer_id ? '***provided***' : 'missing',
      otp: body.otp ? '***provided***' : 'missing'
    });
    const { customer_id, otp } = body;

    if (!customer_id || !otp) {
      console.error('[validate-otp] Missing required fields:', { customer_id: !customer_id, otp: !otp });
      return NextResponse.json(
        { success: false, error: 'Customer ID and OTP are required' },
        { status: 400 }
      );
    }

    const apiUrl = `${API_BASE_URL}/mtd/hardware-pin/validate-otp`;
    console.log('[validate-otp] Calling API:', apiUrl);
    console.log('[validate-otp] Request payload:', { customer_id, otp: '***hidden***' });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer_id, otp }),
    });

    console.log('[validate-otp] API response status:', response.status);
    console.log('[validate-otp] API response ok:', response.ok);

    const responseText = await response.text();
    console.log('[validate-otp] API response text:', responseText.substring(0, 200));

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('[validate-otp] API response parsed successfully');
    } catch (parseError) {
      console.error('[validate-otp] Failed to parse API response as JSON:', parseError);
      throw new Error(`Invalid JSON response from API: ${responseText.substring(0, 100)}`);
    }

    console.log('[validate-otp] Returning response with status:', response.status);
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('[validate-otp] Error occurred:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error && 'cause' in error ? error.cause : undefined
    });
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to validate OTP' 
      },
      { status: 500 }
    );
  }
}

