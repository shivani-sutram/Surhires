import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { BackToTop } from "@/components/layout/back-to-top";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const themeInitScript =
  '(()=>{let t="system";try{const v=localStorage.getItem("surhires-theme");if(v==="light"||v==="dark"||v==="system")t=v}catch{}const d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);const r=document.documentElement;r.classList.toggle("dark",d);r.dataset.themeMode=t;r.style.colorScheme=d?"dark":"light"})();';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://surhires.com",
  ),
  title: {
    default: "Surhires — Better work starts with better matches",
    template: "%s | Surhires",
  },
  description:
    "A more thoughtful way to find your next teammate or your next great opportunity.",
  openGraph: {
    title: "Surhires — Better work starts with better matches",
    description:
      "Meet the people and opportunities that move you forward with Surhires.",
    siteName: "Surhires",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#fbfaf7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <Navbar />
          {children}
          <Footer />
          <ScrollProgress />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
