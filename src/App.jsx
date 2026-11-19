import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import WhyMine from './components/WhyMine.jsx';
import BrandStrip from './components/BrandStrip.jsx';
import BuyHostMine from './components/BuyHostMine.jsx';
import BudgetFleet from './components/BudgetFleet.jsx';
import MinerGrid from './components/MinerGrid.jsx';
import WhyHost from './components/WhyHost.jsx';
import Hosting from './components/Hosting.jsx';
import RepairExplorer from './components/RepairExplorer.jsx';
import MiningCalculator from './components/MiningCalculator.jsx';
import Ticker from './components/Ticker.jsx';
import CtaBanner from './components/CtaBanner.jsx';
import Faq from './components/Faq.jsx';
import Footer from './components/Footer.jsx';
import { useMotion } from './lib/motion.js';

export default function App() {
  useMotion();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyMine />
        <BrandStrip />
        <BuyHostMine />
        <BudgetFleet />
        <MinerGrid />
        <WhyHost />
        <Hosting />
        <RepairExplorer />
        <MiningCalculator />
        <Ticker reverse />
        <CtaBanner />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
