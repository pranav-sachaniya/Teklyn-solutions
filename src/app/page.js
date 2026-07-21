import PageTransition from "./components/PageTransition";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Mission from "./components/Mission";
import Industries from "./components/Industries";
import MidCTA from "./components/MidCTA";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <PageTransition />
      <Navbar />
      
      <Hero />
      <Marquee />
      
      <Services /> {/* What We Do */}
      
      <Process /> {/* Our Achievements */}
      
      <Projects /> {/* Featured Work */}
      
      <Mission /> {/* Your Trusted Partner */}
      
      <Industries />
      
      <MidCTA /> {/* Ready to transform your business? */}
      
      <Testimonials />
      
      <Blog /> {/* Insights */}
      
      <FAQ /> {/* Got Questions? */}
      
      <CTA /> {/* Have a cool project? */}
      
      <Footer />
    </main>
  );
}
