import Hero from "@/components/hero";
import { SiteBrand } from "@/components/site-brand";
import { WayfinderBot } from "@/components/wayfinder-bot";
import { WayfinderJourney } from "@/components/wayfinder-journey";
import { AiModelScreen } from "@/sections/ai-model-screen";
import { AboutScreen } from "@/sections/about-screen";
import { FeaturedProjectScreen } from "@/sections/featured-project-screen";
import { MobileAppScreen } from "@/sections/mobile-app-screen";
import { ContactScreen } from "@/sections/contact-screen";

export default function Home() {
  return (
    <>
      <SiteBrand />
      <main>
        <Hero name="Murat YILDIRIM" />
        <WayfinderJourney mascot={<WayfinderBot />}>
          <AboutScreen />
          <AiModelScreen />
          <FeaturedProjectScreen />
          <MobileAppScreen />
        </WayfinderJourney>
        <ContactScreen />
      </main>
    </>
  );
}
