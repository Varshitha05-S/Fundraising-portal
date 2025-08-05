import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';
import { mockApi } from '../api/mockApi';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await mockApi.getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <Medal className="h-6 w-6 text-blue-500" />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default: return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fundraising Leaderboard</h1>
        <p className="text-gray-600">See how our top fundraisers are making an impact</p>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-12">
        <div className="flex justify-center items-end space-x-4 mb-8">
          {leaderboard.slice(0, 3).map((entry, index) => {
            const position = [1, 0, 2][index]; // 2nd, 1st, 3rd
            const actualEntry = leaderboard[position];
            const heights = ['h-32', 'h-40', 'h-28'];
            const heightClass = heights[index];
            
            return (
              <div key={actualEntry.id} className="text-center">
                <div className={`${heightClass} w-24 bg-gradient-to-t ${getRankBadgeColor(actualEntry.rank)} rounded-t-lg flex flex-col justify-end p-2 mb-2`}>
                  <img
                    src={actualEntry.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`}
                    alt={actualEntry.name}
                    className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-white"
                  />
                  <div className="text-white text-xs font-bold">#{actualEntry.rank}</div>
                </div>
                <div className="text-sm font-semibold text-gray-900">{actualEntry.name}</div>
                <div className="text-xs text-gray-600">₹{actualEntry.totalRaised.toLocaleString('en-IN')}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="text-xl font-bold text-white">Complete Rankings</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {leaderboard.map((entry) => (
            <div
              key={entry.id}
              className={`px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${
                entry.rank <= 3 ? 'bg-gradient-to-r from-blue-50 to-purple-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getRankBadgeColor(entry.rank)}`}>
                    <span className="font-bold text-lg">#{entry.rank}</span>
                  </div>
                  
                  <img
                    src={entry.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`}
                    alt={entry.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                  />
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">{entry.name}</h3>
                    <p className="text-sm text-gray-600">Code: {entry.referralCode}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-lg text-green-600">
                      ${entry.totalRaised.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Total Raised</p>
                  </div>
                  {getRankIcon(entry.rank)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Motivational Footer */}
      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Keep Climbing! 🚀</h3>
          <p className="text-gray-600">
            Every dollar raised makes a difference. Keep sharing your referral code and watch your impact grow!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;