import HeroSection from "./HeroSection";
import ServiceSection from "./ServiceSection";
import AboutUsSection from "./AboutUsSection";
import AnimateBanner from "../../components/Banners/AnimateBanner";
import HeroCarouselScroll from "../../components/Heros/HeroCarouselScroll";
import ContactSection from "./ContactSection";


const Home = () => {
  return (
    <>
      <>
        <HeroSection />
        <AnimateBanner/>
      </>
      <>
        <ServiceSection />
        <HeroCarouselScroll />
      </>
      <>
      <AboutUsSection />
      </>
      <>
      <ContactSection/>
      </>
    </>
  );
};

export default Home;
