import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, nubanAccountNumber } = body;

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

    // Here, process the enquiry, e.g., save to database, send email
    // For now, just return success

    const data = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      nubanAccountNumber: nuban,
      emailSent: true
    };

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully.", data }, { status: 201 });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json({ success: false, error: "Failed to process enquiry." }, { status: 500 });
  }
}