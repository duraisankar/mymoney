import { BrowserRouter, Routes, Route } from 'react-router';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import OverviewPage from './pages/OverviewPage';
import AppLayout from './layouts/AppLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding — full-screen, no bottom nav */}
        <Route path="/" element={<OnboardingPage />} />

        {/* App screens — with bottom nav layout */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/overview" element={<OverviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
