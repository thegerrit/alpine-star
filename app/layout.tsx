import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
export const metadata: Metadata = { title: "Alpine Star | Every summit starts with you.", description: "A little more prepared. A lot more possibility. Meet Alpine Star, your future mountaineering companion for route planning, mountain conditions, and the journey ahead." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
