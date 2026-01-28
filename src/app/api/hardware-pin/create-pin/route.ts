import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 
  'https://products.summitbankng.com';

export async function POST(request: NextRequest) {
  console.log('[create-pin] POST request received');
  console.log('[create-pin] API_BASE_URL from env:', process.env.NEXT_PUBLIC_API_BASE_URL || 'NOT SET (using default)');
  console.log('[create-pin] Final API_BASE_URL:', API_BASE_URL);
  try {
    const body = await request.json();
    console.log('[create-pin] Request body:', { 
      userId: body.userId ? '***provided***' : 'missing',
      serialNumber: body.serialNumber ? '***provided***' : 'missing',
      pin: body.pin ? '***provided***' : 'missing'
    });
    const { userId, serialNumber, pin } = body;

    if (!userId || !serialNumber || !pin) {
      console.error('[create-pin] Missing required fields:', { 
        userId: !userId, 
        serialNumber: !serialNumber, 
        pin: !pin 
      });
      return NextResponse.json(
        { success: false, error: 'User ID, Serial Number, and PIN are required' },
        { status: 400 }
      );
    }

    const apiUrl = `${API_BASE_URL}/mtd/hardware-pin/create-pin`;
    console.log('[create-pin] Calling API:', apiUrl);
    console.log('[create-pin] Request payload:', { userId, serialNumber, pin: '***hidden***' });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, serialNumber, pin }),
    });

    console.log('[create-pin] API response status:', response.status);
    console.log('[create-pin] API response ok:', response.ok);

    const responseText = await response.text();
    console.log('[create-pin] API response text:', responseText.substring(0, 200));

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('[create-pin] API response parsed successfully');
    } catch (parseError) {
      console.error('[create-pin] Failed to parse API response as JSON:', parseError);
      throw new Error(`Invalid JSON response from API: ${responseText.substring(0, 100)}`);
    }

    console.log('[create-pin] Returning response with status:', response.status);
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('[create-pin] Error occurred:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error && 'cause' in error ? error.cause : undefined
    });
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create hardware PIN' 
      },
      { status: 500 }
    );
  }
}

