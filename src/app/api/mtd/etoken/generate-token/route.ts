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
    const customerId = String(body?.customer_id ?? "").trim();

    const errors: ValidationError[] = [];
    if (!customerId) {
      errors.push({ msg: "Customer ID is required", param: "customer_id", location: "body" });
    } else if (!/^[a-zA-Z0-9]+$/.test(customerId)) {
      errors.push({ msg: "Customer ID must be alphanumeric", param: "customer_id", location: "body" });
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    let upstreamResponse: Response;
    try {
      upstreamResponse = await fetch(`${BASE_URL}/mtd/etoken/generate-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id: customerId }),
      });
    } catch (error) {
      console.error("Generate token upstream unreachable:", error);
      return NextResponse.json({ success: false, error: "No response from upstream service" }, { status: 502 });
    }

    const responseText = (await upstreamResponse.text()).trim();
    if (!responseText || responseText.startsWith("<!DOCTYPE") || responseText.startsWith("<html")) {
      return NextResponse.json({ success: false, error: "No response from upstream service" }, { status: 502 });
    }

    let data: unknown;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error("Invalid JSON from generate-token upstream:", error);
      return NextResponse.json({ success: false, error: "No response from upstream service" }, { status: 502 });
    }

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to generate token",
          data,
        },
        { status: upstreamResponse.status }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Generate token route error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate token" }, { status: 500 });
  }
}
