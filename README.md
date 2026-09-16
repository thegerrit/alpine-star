# Alpine Star

A Next.js landing page for a mountaineering app concept. It includes a responsive Higgsfield-generated product image and a waitlist form backed by a Vercel Function and a private Google Sheet.

## Development

```bash
npm install
npm run dev
```

Open http://127.0.0.1:3010.

## Waitlist spreadsheet

Create a Google Sheet with a tab named `Waitlist` and add this header row:

```text
Submitted at | Name | Years climbing | Age | City | Email | Phone | Source
```

In Google Cloud, enable the Google Sheets API and create a service account with a JSON key. Share the spreadsheet with the service account's email address as an Editor. Do not make the sheet public.

Copy `.env.example` to `.env.local` for local development. Add the same four values to the Vercel project's encrypted environment variables:

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SHEET_ID`
- `GOOGLE_SHEET_NAME` (optional; defaults to `Waitlist`)

The private key should keep its escaped `\n` line breaks when entered in Vercel. Never commit `.env.local` or the downloaded service-account JSON file.

## Verification

```bash
npm run build
npm start
```

The form validates all requested fields, includes an explicit updates consent checkbox and a hidden bot trap, and sends submissions to `POST /api/waitlist`. The server—not the browser—authenticates to Google Sheets.

Project pipeline notes are in `step-*.md`.
