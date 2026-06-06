import { useNavigate } from 'react-router';
import walletIllustration from '../assets/wallet-illustration.png';

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div
      id="onboarding-page"
      className="w-full max-w-[430px] min-h-dvh flex flex-col items-center justify-center px-8 py-12 bg-white"
    >
      {/* Illustration Container */}
      <div className="relative mb-10 animate-scale-in">
        {/* Soft purple ring background */}
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary-100 via-primary-50 to-transparent flex items-center justify-center">
          <div className="w-52 h-52 rounded-full bg-gradient-to-br from-primary-50 to-white flex items-center justify-center overflow-hidden">
            <img
              src={walletIllustration}
              alt="3D Wallet illustration with coins and credit cards"
              className="w-48 h-48 object-contain animate-float"
              loading="eager"
            />
          </div>
        </div>

        {/* Decorative dots */}
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary-300 opacity-60 animate-pulse" />
        <div className="absolute bottom-8 left-2 w-2 h-2 rounded-full bg-accent-400 opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-16 left-0 w-2.5 h-2.5 rounded-full bg-primary-200 opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Text Content */}
      <div className="text-center animate-fade-in-up delay-200">
        <h1 className="text-2xl font-bold text-text-primary leading-tight mb-3">
          Save your money with
          <br />
          <span className="text-primary-600">Expense Tracker</span>
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-[280px] mx-auto">
          Save money! The more your money works for you, the less you have to
          work for money.
        </p>
      </div>

      {/* CTA Button */}
      <button
        id="onboarding-cta"
        onClick={() => navigate('/home')}
        className="mt-10 w-full max-w-[240px] py-4 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-base shadow-button hover:shadow-lg hover:from-primary-700 hover:to-primary-600 active:scale-[0.97] transition-all duration-200 animate-fade-in-up delay-400 cursor-pointer"
      >
        Let's Start
      </button>
    </div>
  );
}
