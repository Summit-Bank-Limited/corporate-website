import fs from "node:fs/promises";
import path from "node:path";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
  Table,
  TableCell,
  TableRow,
  WidthType,
  AlignmentType,
  BorderStyle,
} from "docx";

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, "docs");
const outputPath = path.join(
  outputDir,
  "Corporate-Website-Technical-Overview.docx"
);

const now = new Date();

const pages = [
  "/", "/about-us", "/management-team", "/branches", "/atms", "/careers",
  "/careers/internships", "/careers/career-opportunities", "/faq", "/privacy-policy", "/contact",
  "/personal-current-account", "/personal-savings-account", "/personal-summit-mtd",
  "/personal-summit-cost-plus", "/personal-summit-lease", "/personal-summit-sukuk-investments",
  "/personal-customized-investment-plan", "/business", "/business-corporate-account",
  "/business-summit-mtd", "/business-summit-cost-plus", "/business-summit-lease",
  "/business-summit-sukuk-investments", "/business-customized-investment-plan", "/corporate-account",
  "/corporate-summit-mtd", "/corporate-summit-cost-plus", "/corporate-summit-lease",
  "/corporate-summit-sukuk-investments", "/corporate-customized-investment-plan",
  "/deposit-products", "/financing-products", "/treasury-and-investment-products",
  "/digital-and-alternative-banking-solutions", "/takaful", "/saving-account",
  "/open-account/current-account", "/open-account/mudarabah/learn-more",
  "/open-account/mudarabah/tier1", "/open-account/mudarabah/tier2", "/open-account/mudarabah/tier3",
  "/forms", "/forms/request-etoken", "/activate-card", "/reset-pin", "/create-hardware-pin",
  "/summitblog/press-release", "/summitblog/press-release/[slug]", "/gallery", "/gallery/[folder]",
];

const productsEndpoints = [
  { method: "POST", url: "https://products.summitbankng.com/mtd/request-token-bvn", body: '{ "accountNumber": "string", "bvn": "string" }' },
  { method: "POST", url: "https://products.summitbankng.com/mtd/card-activation", body: '{ "accountNumber": "string", "token": "string", "cardNumber": "string", "pin": "string" }' },
  { method: "POST", url: "https://products.summitbankng.com/mtd/card-reset-pin", body: '{ "accountNumber": "string", "token": "string", "cardNumber": "string", "pin": "string" }' },
  { method: "POST", url: "https://products.summitbankng.com/mtd/mtd/verify", body: '{ "accountNumber": "string", "bvn": "string" }' },
  { method: "POST", url: "https://products.summitbankng.com/mtd/mtd/verify-corporate", body: '{ "accountNumber": "string", "tin": "string" }' },
  { method: "GET", url: "https://products.summitbankng.com/mtd/mtd/rates", body: "None" },
  { method: "GET", url: "https://products.summitbankng.com/mtd/mtd/rates/calculate?amount={amount}&tenor={tenor}&effectiveDate={effectiveDate}", body: "None" },
  { method: "POST", url: "https://products.summitbankng.com/mtd/mtd/application", body: "{ accountNumber, bvn, accountType, investmentAmount, effectiveDate, tenor, expectedProfitRate, maturityInstruction, specialRate, staffId, staffEmail, customerSignature, customerData }" },
  { method: "POST", url: "https://products.summitbankng.com/mtd/etoken/generate-token", body: '{ "customer_id": "string" }' },
  { method: "POST", url: "https://products.summitbankng.com/mtd/etoken/validate-token", body: '{ "customer_id": "string", "token": "string" }' },
  { method: "POST", url: "https://products.summitbankng.com/mtd/etoken/customer-details", body: '{ "accountNumber": "string" }' },
  { method: "POST", url: "https://products.summitbankng.com/mtd/etoken/request", body: '{ "accountNumber": "string", "accountName": "string", "email": "string", "phoneNumber": "string" }' },
  { method: "POST", url: "https://products.summitbankng.com/mtd/enquiry/create", body: "{ name, email, subjectType, subject, message, nubanAccountNumber?, last6DigitsOfCard?, amount?, transactionSessionId?, channel?, transactionDate? }" },
  { method: "POST", url: "https://products.summitbankng.com/mtd/hardware-pin/send-otp", body: '{ "customer_id": "string" }' },
  { method: "POST", url: "https://products.summitbankng.com/mtd/hardware-pin/validate-otp", body: '{ "customer_id": "string", "otp": "string" }' },
  { method: "POST", url: "https://products.summitbankng.com/mtd/hardware-pin/create-pin", body: '{ "userId": "string", "serialNumber": "string", "pin": "string" }' },
];

const validationRows = [
  ["Account Number", "Exactly 10 digits", "Card activation/reset, MTD, eToken lookup"],
  ["BVN", "Exactly 11 digits", "Card activation/reset, MTD individual verify"],
  ["TIN", "Required non-empty", "MTD corporate verify"],
  ["OTP / Token", "Exactly 6 digits", "eToken + hardware pin flows"],
  ["PIN", "Exactly 4 digits", "Card activation/reset and hardware pin"],
  ["MTD investment amount", "Minimum ₦1,000,000", "MTD application form"],
  ["MTD tenor", "One of 30, 60, 90, 180, 365", "MTD application form"],
  ["Email", "Must match email regex", "Enquiry and eToken request"],
  ["NUBAN", "Exactly 10 digits", "Complaints/dispense-error enquiries"],
  ["Card last 6 digits", "Exactly 6 digits", "Dispense-error enquiry"],
];

function heading(text, level) {
  return new Paragraph({
    text,
    heading: level,
    spacing: { before: 200, after: 120 },
  });
}

function bullet(text) {
  return new Paragraph({
    text,
    bullet: { level: 0 },
    spacing: { after: 60 },
  });
}

function codeLine(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        font: "Consolas",
        size: 20,
      }),
    ],
    spacing: { after: 30 },
  });
}

function endpointTable() {
  const rows = [
    new TableRow({
      children: [
        "Method",
        "URL",
        "Request Body",
      ].map((h) => new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })],
      })),
    }),
    ...productsEndpoints.map((ep) =>
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(ep.method)] }),
          new TableCell({ children: [new Paragraph(ep.url)] }),
          new TableCell({ children: [new Paragraph(ep.body)] }),
        ],
      })
    ),
  ];

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "D9D9D9" },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "D9D9D9" },
    },
  });
}

function validationTable() {
  const rows = [
    new TableRow({
      children: ["Field", "Rule", "Used In"].map((h) =>
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })],
        })
      ),
    }),
    ...validationRows.map((r) =>
      new TableRow({
        children: r.map((c) => new TableCell({ children: [new Paragraph(c)] })),
      })
    ),
  ];

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "D9D9D9" },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "D9D9D9" },
    },
  });
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "Summit Bank Corporate Website",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 180 },
          }),
          new Paragraph({
            text: "Technical Overview",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          }),
          new Paragraph({
            text: `Version: 0.1.0 | Generated: ${now.toISOString()}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          heading("1. Executive Summary", HeadingLevel.HEADING_1),
          bullet("Public-facing corporate website built on Next.js App Router with React and TypeScript."),
          bullet("Combines marketing/content pages with self-service workflows for banking customers."),
          bullet("Server-side API routes proxy and validate requests before forwarding to Products APIs."),

          heading("2. Technology Stack", HeadingLevel.HEADING_1),
          bullet("Framework: Next.js 16.1.1 with App Router"),
          bullet("Language: TypeScript"),
          bullet("UI: Tailwind CSS, Radix UI, custom component library"),
          bullet("UX: framer-motion, embla carousel, react-modal, react-hot-toast"),
          bullet("Media: Cloudinary integration"),
          bullet("Content parsing: js-yaml for gallery metadata"),

          heading("3. Project Structure", HeadingLevel.HEADING_1),
          codeLine("src/app            # Page routes and API routes"),
          codeLine("src/app/api        # Proxy handlers to upstream services"),
          codeLine("src/components     # Reusable UI and feature components"),
          codeLine("src/lib            # Utilities (oauth2, hardwarePinApi, helpers)"),
          codeLine("public             # Static assets"),
          codeLine("gallery.yml        # Gallery content source"),

          heading("4. Application Routes", HeadingLevel.HEADING_1),
          new Paragraph(`Total major page routes discovered: ${pages.length}`),
          ...pages.map((p) => bullet(p)),

          heading("5. Feature Modules", HeadingLevel.HEADING_1),
          bullet("MTD application wizard with account verification, rate calculation, and signature capture."),
          bullet("Card activation and reset PIN workflows with token verification."),
          bullet("eToken request journey: generate, validate, fetch customer details, submit."),
          bullet("Hardware PIN flow: send OTP, validate OTP, create hardware PIN."),
          bullet("Contact module handling enquiries, complaints, and dispense-error workflows."),
          bullet("Gallery module backed by YAML content and Cloudinary-hosted media."),

          heading("6. Integration Architecture", HeadingLevel.HEADING_1),
          codeLine("Browser/UI"),
          codeLine("  -> Next.js API routes (/api/...)"),
          codeLine("      -> Products API (https://products.summitbankng.com/...)"),
          new Paragraph({
            text: "Products API Endpoints (method, URL, request body):",
            spacing: { before: 120, after: 120 },
          }),
          endpointTable(),

          heading("7. Environment Variables", HeadingLevel.HEADING_1),
          bullet("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME (default: summitbank)"),
          bullet("CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET"),
          bullet("NEXT_PUBLIC_API_BASE_URL (default: https://products.summitbankng.com)"),
          bullet("NEXT_PUBLIC_OAUTH2_TOKEN_URL"),
          bullet("NEXT_PUBLIC_OAUTH2_CLIENT_ID"),
          bullet("NEXT_PUBLIC_OAUTH2_CLIENT_SECRET"),

          heading("8. Validation Rules (Quick Reference)", HeadingLevel.HEADING_1),
          validationTable(),

          heading("9. Dev/Build Commands", HeadingLevel.HEADING_1),
          codeLine("npm run dev"),
          codeLine("npm run build"),
          codeLine("npm run start"),
          codeLine("npm run lint"),
          codeLine("npm run docs:build"),

          heading("10. Notable Caveats / Review Points", HeadingLevel.HEADING_1),
          bullet("Some upstream routes include duplicated path segment (/mtd/mtd/...). Confirm this is intentional."),
          bullet("OAuth2 helper references NEXT_PUBLIC_* credentials; review exposure and security posture."),
          bullet("Verify OAuth token request payload behavior in oauth2 utility if token flow is activated."),

          heading("11. Glossary", HeadingLevel.HEADING_1),
          bullet("MTD: Mudarabah Term Deposit"),
          bullet("BVN: Bank Verification Number"),
          bullet("TIN: Tax Identification Number"),
          bullet("NUBAN: Nigerian Uniform Bank Account Number"),
          bullet("eToken: One-time token process used in request/validation workflows"),
          bullet("Sukuk: Shariah-compliant investment instrument"),
          bullet("Takaful: Islamic insurance model"),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  await fs.writeFile(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

main().catch((error) => {
  console.error("Failed to generate .docx:", error);
  process.exit(1);
});
