import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import BabyCare from './components/sections/BabyCare';
import Communication from './components/sections/Communication';
import LGBTQParenting from './components/sections/LGBTQParenting';
import ReturnToWork from './components/sections/ReturnToWork';
import EmotionalWellbeing from './components/sections/EmotionalWellbeing';
import CommunitySupport from './components/sections/CommunitySupport';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import UserDashboard from './components/auth/UserDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && !user) {
      setUser(JSON.parse(savedUser));
    }
  }, [user]);

  return (
    <div className="app-container">
      <Router>
        <Navbar user={user} onLogout={setUser} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/baby-care" element={<BabyCare />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/lgbtq-parenting" element={<LGBTQParenting />} />
            <Route path="/return-to-work" element={<ReturnToWork />} />
            <Route path="/emotional-wellbeing" element={<EmotionalWellbeing />} />
            <Route path="/community-support" element={<CommunitySupport />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage onLogin={setUser} />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <UserDashboard user={user} onLogout={setUser} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
