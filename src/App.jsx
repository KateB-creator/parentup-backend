import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage';
import BabyCare from './components/sections/BabyCare';
import Communication from './components/sections/Communication';
import LGBTQParenting from './components/sections/LGBTQParenting';
import ReturnToWork from './components/sections/ReturnToWork';
import EmotionalWellbeing from './components/sections/EmotionalWellbeing';
import CommunitySupport from './components/sections/CommunitySupport';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/baby-care" element={<BabyCare />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/lgbtq-parenting" element={<LGBTQParenting />} />
        <Route path="/return-to-work" element={<ReturnToWork />} />
        <Route path="/emotional-wellbeing" element={<EmotionalWellbeing />} />
        <Route path="/community-support" element={<CommunitySupport />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
