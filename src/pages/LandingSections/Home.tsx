import HeroSection from "./HeroSection";
import ServiceSection from "./ServiceSection";
import AboutUsSection from "./AboutUsSection";
import ContactSection from "./ContactSection";
import AnimateBanner from "../../components/Banners/AnimateBanner";
import HeroCarouselScroll from "../../components/Heros/HeroCarouselScroll";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AnimateBanner />
      <ServiceSection />
      <HeroCarouselScroll />
      <AboutUsSection />
      <ContactSection />
    </>
  );
};

export default Home;
