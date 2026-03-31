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
    const accountName = String(body?.accountName ?? "").trim();
    const email = String(body?.email ?? "").trim();

    const errors: ValidationError[] = [];

    if (!accountNumber) {
      errors.push({ msg: "Account number is required", param: "accountNumber", location: "body" });
    } else if (!/^\d+$/.test(accountNumber)) {
      errors.push({ msg: "Account number must contain only digits", param: "accountNumber", location: "body" });
    }

    if (!accountName) {
      errors.push({ msg: "Account name is required", param: "accountName", location: "body" });
    }

    if (!email) {
      errors.push({ msg: "Email is required", param: "email", location: "body" });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ msg: "Email must be valid", param: "email", location: "body" });
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    let upstreamResponse: Response;
    try {
      upstreamResponse = await fetch(`${BASE_URL}/mtd/etoken/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountNumber, accountName, email }),
      });
    } catch (error) {
      console.error("eToken request upstream unreachable:", error);
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
      console.error("Invalid JSON from eToken request upstream:", error);
      return NextResponse.json({ success: false, error: "No response from upstream service" }, { status: 502 });
    }

    if (!upstreamResponse.ok || data?.success === false) {
      return NextResponse.json(
        { success: false, error: data?.error || "Failed to process eToken request" },
        { status: upstreamResponse.status || 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: data?.message || "eToken request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("eToken request route error:", error);
    return NextResponse.json({ success: false, error: "Failed to process eToken request" }, { status: 500 });
  }
}
