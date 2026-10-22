import { FooterCta } from "@/components/sections/footer-cta";
import {
  FeaturedRoles,
  HomeFaq,
  HomeHero,
  Testimonials,
} from "@/components/sections/home-sections";
import { HowItWorks } from "@/components/sections/how-it-works";
import { EmployerLogoMarquee } from "@/components/motion/marquee";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <HomeHero />
      <HowItWorks />
      <FeaturedRoles />
      <EmployerLogoMarquee />
      <Testimonials />
      <HomeFaq />
      <FooterCta />
    </main>
  );
}
