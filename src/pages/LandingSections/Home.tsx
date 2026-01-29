import { lazy, Suspense } from "react";
import HeroSection from "./HeroSection";
import ServiceSection from "./ServiceSection";
import AboutUsSection from "./AboutUsSection";
import ContactSection from "./ContactSection";
const HeroCarouselScroll = lazy(
  () => import("../../components/Heros/HeroCarouselScroll")
);

const AnimateBanner = lazy(
  () => import("../../components/Banners/AnimateBanner")
);

const Home = () => {
  return (
    <>
      <>
        <h1 className="text-[#d45500] sr-only">
          Topografía, Arquitectura y Diseño en Lago Agrio – SCCAD
        </h1>
        <HeroSection />
        <Suspense fallback={null}>
          <AnimateBanner />
        </Suspense>
      </>
      <>
        <Suspense fallback={null}>
          <ServiceSection />
        </Suspense>
        <Suspense fallback={null}>
          <HeroCarouselScroll />
        </Suspense>
      </>
      <>
        <Suspense fallback={null}>
          <AboutUsSection />
        </Suspense>
      </>
      <>
        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>
      </>
    </>
  );
};

export default Home;
