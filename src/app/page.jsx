import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../app/components/HeroSection";
import OderVisibility from "../app/components/OderVisibility";
import AI3DSection from "../app/components/AI-3DSection";
import ComplianceSection from "../app/components/ComplianceSection";
import RegisterSection from "../app/components/RegisterSection";
import TimelineSection from "../app/components/TimelineSection";
import Testimonials from "../app/components/Testimonials";
import SolutionsSection from "../app/components/SolutionsSection";
import ImageHoverSection from "../app/components/ImageHoverSection";
import ContactUs from "../app/contact/page";
import AboutUs from "../app/about/page";
import VendorOnboarding from "./components/VendorOnboarding";
import Onboarding from "./Onboarding/page";
import SignupSignin from "./components/SignupSignin";
// import SolutionPage from "@/app/components/SolutionPage";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <OderVisibility />
      <AI3DSection />
      <ComplianceSection />
      <ImageHoverSection />
      <RegisterSection />
      <TimelineSection />
      <Testimonials />
      <SolutionsSection />

      

      <SignupSignin />
      {/* <VendorOnboarding /> */}
      {/* <Onboarding /> */}
    </div>
  );
}
