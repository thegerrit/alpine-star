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

const GOOGLE_FORM_RESPONSE_URL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSftyZOTEL5RmNChTCnjkM0tF6rvFAnb_aMSVLMDtkwZWGfCqw/formResponse";

const formFields = {
  name: "entry.341034066",
  yearsExperience: "entry.1337350064",
  age: "entry.829909369",
  city: "entry.1671605173",
  email: "entry.2096573677",
  phone: "entry.558610774",
} as const;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistPayload;
    if (clean(body.website, 200)) return NextResponse.json({ ok: true });

    const name = clean(body.name, 100);
    const city = clean(body.city, 100);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 30);
    const yearsExperience = Number(body.yearsExperience);
    const age = Number(body.age);

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (
      !name ||
      !city ||
      !phone ||
      !emailIsValid ||
      body.consent !== "yes" ||
      !Number.isInteger(yearsExperience) ||
      yearsExperience < 0 ||
      yearsExperience > 80 ||
      !Number.isInteger(age) ||
      age < 1 ||
      age > 120
    ) {
      return NextResponse.json(
        { error: "Please check the submitted details." },
        { status: 400 },
      );
    }

    const formBody = new URLSearchParams({
      [formFields.name]: name,
      [formFields.yearsExperience]: String(yearsExperience),
      [formFields.age]: String(age),
      [formFields.city]: city,
      [formFields.email]: email,
      [formFields.phone]: phone,
      submit: "Submit",
    });

    const formResponse = await fetch(GOOGLE_FORM_RESPONSE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
      cache: "no-store",
      redirect: "follow",
    });

    if (!formResponse.ok) throw new Error("Google Forms submission failed");
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Waitlist submission failed", error);
    return NextResponse.json(
      { error: "Unable to join the waitlist right now." },
      { status: 500 },
    );
  }
}
