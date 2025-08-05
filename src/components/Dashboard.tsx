import React, { useState, useEffect } from 'react';
import { User, Reward } from '../types';
import { mockApi } from '../api/mockApi';
import { DollarSign, Users, Share2, Calendar, Copy, Check } from 'lucide-react';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const rewardsData = await mockApi.getRewards(user.id);
        setRewards(rewardsData);
      } catch (error) {
        console.error('Failed to fetch rewards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [user.id]);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const unlockedRewards = rewards.filter(r => r.unlocked);
  const nextReward = rewards.find(r => !r.unlocked);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bronze': return 'from-amber-500 to-orange-600';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'platinum': return 'from-purple-500 to-purple-700';
      default: return 'from-blue-500 to-blue-700';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-gray-600">Here's your fundraising progress and achievements.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Raised</p>
              <p className="text-3xl font-bold text-green-600">₹{user.totalRaised.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rewards Unlocked</p>
              <p className="text-3xl font-bold text-blue-600">{unlockedRewards.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Referral Code</p>
              <p className="text-xl font-bold text-purple-600">{user.referralCode}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Share2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <button
            onClick={copyReferralCode}
            className="mt-3 flex items-center space-x-2 text-sm text-purple-600 hover:text-purple-700 transition-colors duration-200"
          >
            {copiedCode ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Member Since</p>
              <p className="text-lg font-bold text-gray-800">
                {new Date(user.joinedDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <Calendar className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress to Next Reward */}
      {nextReward && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Next Milestone</h2>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{nextReward.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{nextReward.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{nextReward.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((user.totalRaised / nextReward.requiredAmount) * 100, 100)}%`
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                ₹{user.totalRaised.toLocaleString('en-IN')} / ₹{nextReward.requiredAmount.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rewards Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                reward.unlocked
                  ? 'border-green-200 bg-green-50 hover:shadow-md'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`text-3xl ${reward.unlocked ? '' : 'grayscale'}`}>
                  {reward.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${reward.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                    {reward.title}
                  </h3>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(reward.category)} text-white`}>
                    {reward.category.toUpperCase()}
                  </div>
                </div>
              </div>
              <p className={`text-sm ${reward.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                {reward.description}
              </p>
              <p className={`text-xs mt-2 ${reward.unlocked ? 'text-green-600' : 'text-gray-400'}`}>
                Goal: ₹{reward.requiredAmount.toLocaleString('en-IN')}
              </p>
              {reward.unlocked && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Unlocked
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;