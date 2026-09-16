import { createSign } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type WaitlistPayload = {
  name?: unknown;
  yearsExperience?: unknown;
  age?: unknown;
  city?: unknown;
  email?: unknown;
  phone?: unknown;
  consent?: unknown;
  website?: unknown;
};

const encode = (value: string | Buffer) => Buffer.from(value).toString("base64url");

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function getGoogleAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !privateKey) throw new Error("Google service account is not configured");

  const now = Math.floor(Date.now() / 1000);
  const header = encode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = encode(JSON.stringify({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  signer.end();
  const assertion = `${header}.${claims}.${signer.sign(privateKey, "base64url")}`;

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    cache: "no-store",
  });
  if (!tokenResponse.ok) throw new Error("Google authentication failed");
  const token = await tokenResponse.json() as { access_token?: string };
  if (!token.access_token) throw new Error("Google access token was missing");
  return token.access_token;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as WaitlistPayload;
    if (clean(body.website, 200)) return NextResponse.json({ ok: true });

    const name = clean(body.name, 100);
    const city = clean(body.city, 100);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 30);
    const yearsExperience = Number(body.yearsExperience);
    const age = Number(body.age);

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !city || !phone || !emailIsValid || body.consent !== "yes" || !Number.isInteger(yearsExperience) || yearsExperience < 0 || yearsExperience > 80 || !Number.isInteger(age) || age < 1 || age > 120) {
      return NextResponse.json({ error: "Please check the submitted details." }, { status: 400 });
    }

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME || "Waitlist";
    if (!spreadsheetId) throw new Error("Google Sheet is not configured");

    const token = await getGoogleAccessToken();
    const range = encodeURIComponent(`'${sheetName.replace(/'/g, "''")}'!A:H`);
    const sheetsResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [[new Date().toISOString(), name, yearsExperience, age, city, email, phone, "Website"]] }),
      cache: "no-store",
    });
    if (!sheetsResponse.ok) throw new Error("Google Sheets append failed");
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Waitlist submission failed", error);
    return NextResponse.json({ error: "Unable to join the waitlist right now." }, { status: 500 });
  }
}
