import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      subject, 
      subjectType,
      message, 
      nubanAccountNumber,
      last6DigitsOfCard,
      amount,
      transactionSessionId,
      channel,
      transactionDate
    } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ success: false, error: "Name is required." }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ success: false, error: "Invalid email format." }, { status: 400 });
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json({ success: false, error: "Subject is required." }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ success: false, error: "Message is required." }, { status: 400 });
    }

    if (message.trim().length > 1500) {
      return NextResponse.json({ success: false, error: "Message cannot exceed 1500 characters." }, { status: 400 });
    }

    // Validate nubanAccountNumber if provided
    let nuban = null;
    if (nubanAccountNumber !== undefined && nubanAccountNumber !== null && nubanAccountNumber !== '') {
      const nubanStr = String(nubanAccountNumber).trim();
      if (!/^\d{10}$/.test(nubanStr)) {
        return NextResponse.json({ success: false, error: "NUBAN account number must be 10 digits." }, { status: 400 });
      }
      nuban = nubanStr;
    }

    // Validate Dispense Error specific fields
    const isDispenseError = subjectType && subjectType.toLowerCase() === 'dispense error';
    
    if (isDispenseError) {
      // NUBAN is required for dispense errors
      if (!nuban) {
        return NextResponse.json({ success: false, error: "NUBAN account number is required for dispense errors." }, { status: 400 });
      }

      // Validate last 6 digits of card
      if (!last6DigitsOfCard || typeof last6DigitsOfCard !== 'string' || !last6DigitsOfCard.trim()) {
        return NextResponse.json({ success: false, error: "Last 6 digits of card is required for dispense errors." }, { status: 400 });
      }
      const cardDigits = last6DigitsOfCard.trim();
      if (!/^\d{6}$/.test(cardDigits)) {
        return NextResponse.json({ success: false, error: "Last 6 digits of card must be exactly 6 digits." }, { status: 400 });
      }

      // Validate amount
      if (!amount || typeof amount !== 'string' || !amount.trim()) {
        return NextResponse.json({ success: false, error: "Amount is required for dispense errors." }, { status: 400 });
      }
      const amountNum = parseFloat(amount.trim());
      if (isNaN(amountNum) || amountNum <= 0) {
        return NextResponse.json({ success: false, error: "Amount must be a valid positive number." }, { status: 400 });
      }

      // Validate transaction session ID
      if (!transactionSessionId || typeof transactionSessionId !== 'string' || !transactionSessionId.trim()) {
        return NextResponse.json({ success: false, error: "Transaction/Session ID is required for dispense errors." }, { status: 400 });
      }

      // Validate channel
      if (!channel || typeof channel !== 'string' || !channel.trim()) {
        return NextResponse.json({ success: false, error: "Channel is required for dispense errors." }, { status: 400 });
      }

      // Validate transaction date
      if (!transactionDate || typeof transactionDate !== 'string' || !transactionDate.trim()) {
        return NextResponse.json({ success: false, error: "Transaction date is required for dispense errors." }, { status: 400 });
      }
      // Validate date format (dd/mm/yyyy)
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(transactionDate.trim())) {
        return NextResponse.json({ success: false, error: "Transaction date must be in dd/mm/yyyy format." }, { status: 400 });
      }
    }

    // Prepare payload for external API
    const payload: any = {
      name: name.trim(),
      email: email.trim(),
      subjectType: subjectType || undefined,
      subject: subject.trim(),
      message: message.trim(),
      ...(nuban && { nubanAccountNumber: nuban }),
    };

    // Add dispense error specific fields
    if (isDispenseError) {
      payload.last6DigitsOfCard = last6DigitsOfCard.trim();
      payload.amount = amount.trim();
      payload.transactionSessionId = transactionSessionId.trim();
      payload.channel = channel.trim();
      payload.transactionDate = transactionDate.trim();
    }

    // Make server-to-server call to external API
    const response = await fetch('https://products.summitbankng.com/mtd/enquiry/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json({ success: false, error: "Failed to process enquiry." }, { status: 500 });
  }
}