import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://products.summitbankng.com";

type ValidationError = {
  msg: string;
  param: string;
  location: "body";
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const accountNumber = String(body?.accountNumber ?? "").trim();

    const errors: ValidationError[] = [];
    if (!accountNumber) {
      errors.push({ msg: "Account number is required", param: "accountNumber", location: "body" });
    } else if (!/^\d+$/.test(accountNumber)) {
      errors.push({ msg: "Account number must contain only digits", param: "accountNumber", location: "body" });
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    let upstreamResponse: Response;
    try {
      upstreamResponse = await fetch(`${BASE_URL}/mtd/etoken/customer-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountNumber }),
      });
    } catch (error) {
      console.error("Customer-details upstream unreachable:", error);
      return NextResponse.json({ success: false, error: "No response from upstream service" }, { status: 502 });
    }

    const responseText = (await upstreamResponse.text()).trim();
    if (!responseText || responseText.startsWith("<!DOCTYPE") || responseText.startsWith("<html")) {
      return NextResponse.json({ success: false, error: "No response from upstream service" }, { status: 502 });
    }

    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error("Invalid JSON from customer-details upstream:", error);
      return NextResponse.json({ success: false, error: "No response from upstream service" }, { status: 502 });
    }

    if (!upstreamResponse.ok) {
      const status = upstreamResponse.status;
      const fallbackMessage =
        status === 400
          ? "Invalid or missing account number"
          : status === 404
          ? "Account not found"
          : "Failed to fetch customer details";
      return NextResponse.json(
        {
          success: false,
          error: data?.error || data?.message || fallbackMessage,
          data,
        },
        { status }
      );
    }

    return NextResponse.json({ success: true, data: data?.data ?? data }, { status: 200 });
  } catch (error) {
    console.error("Customer-details route error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch customer details" }, { status: 500 });
  }
}
