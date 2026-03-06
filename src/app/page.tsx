import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import WhyElatedSection from "@/components/landing/WhyElatedSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ResultsSection from "@/components/landing/ResultsSection";
import CalculatorSection from "@/components/landing/CalculatorSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import ReferralSection from "@/components/landing/ReferralSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhyElatedSection />
        <HowItWorksSection />
        <ResultsSection />
        <CalculatorSection />
        <TestimonialsSection />
        <ComparisonSection />
        <ReferralSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
