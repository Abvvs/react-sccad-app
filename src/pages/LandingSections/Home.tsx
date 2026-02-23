import HeroSection from "./HeroSection";
import ServiceSection from "./ServiceSection";
import AboutUsSection from "./AboutUsSection";
import ContactSection from "./ContactSection";
import ProjectSection from "./ProjectSection";
import AnimateBanner from "../../components/Banners/AnimateBanner";
import GallerySection from "./GallerySection.tsx/GallerySection";


const Home = () => {
  return (
    <>
      <HeroSection />
      <AnimateBanner />
      <ServiceSection />
      <AboutUsSection />
      <ProjectSection />
      <GallerySection />
      <ContactSection />
    </>
  );
};

export default Home;
