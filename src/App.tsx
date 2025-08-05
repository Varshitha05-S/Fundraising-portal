import React, { useState } from 'react';
import { User } from './types';
import { mockApi } from './api/mockApi';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await mockApi.login(email, password);
      setUser(userData);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await mockApi.signup(name, email, password);
      setUser(userData);
    } catch (error) {
      alert('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
  };

  const renderAuthPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center">
        <div className="hidden lg:block lg:w-1/2 lg:pr-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              FundRaise Portal
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Empowering interns to make a difference through fundraising
            </p>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Join Us?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Track Your Impact</h4>
                    <p className="text-gray-600 text-sm">Monitor your fundraising progress in real-time</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Earn Rewards</h4>
                    <p className="text-gray-600 text-sm">Unlock achievements as you reach milestones</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Join the Community</h4>
                    <p className="text-gray-600 text-sm">Connect with fellow fundraisers on the leaderboard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          {isLoginMode ? (
            <LoginForm
              onLogin={handleLogin}
              onToggleMode={() => setIsLoginMode(false)}
              isLoading={isLoading}
            />
          ) : (
            <SignupForm
              onSignup={handleSignup}
              onToggleMode={() => setIsLoginMode(true)}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderMainApp = () => (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
        userName={user?.name}
      />
      <main>
        {currentPage === 'dashboard' && user && <Dashboard user={user} />}
        {currentPage === 'leaderboard' && <Leaderboard />}
      </main>
    </div>
  );

  return user ? renderMainApp() : renderAuthPage();
}

export default App;