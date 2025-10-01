// client/src/pages/home.tsx

import { Fragment } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import Hero from '@/components/home/hero';
import Projects from '@/components/home/projects';
import Skills from '@/components/home/skills';
import About from '@/components/home/about';
import Contact from '@/components/home/contact';
import ChatButton from '@/components/home/chat-button';
import AccessibilityMenu from '@/components/home/accessibility-menu';
import BackToTop from '@/components/home/back-to-top';

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
      <ChatButton />
      <AccessibilityMenu />
      <BackToTop />
    </Fragment>
  );
}