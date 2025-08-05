import { User, Reward, LeaderboardEntry } from '../types';
import { mockUsers, mockRewards, mockLeaderboard } from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // User authentication (dummy)
  async login(email: string, password: string): Promise<User> {
    await delay(800);
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      return user;
    }
    throw new Error('Invalid credentials');
  },

  async signup(name: string, email: string, password: string): Promise<User> {
    await delay(1000);
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      referralCode: `${name.toLowerCase().replace(/\s+/g, '')}2025`,
      totalRaised: 0,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    return newUser;
  },

  // Get user data
  async getUser(userId: string): Promise<User> {
    await delay(500);
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    return user;
  },

  // Get rewards data
  async getRewards(userId: string): Promise<Reward[]> {
    await delay(400);
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    
    return mockRewards.map(reward => ({
      ...reward,
      unlocked: user.totalRaised >= reward.requiredAmount
    }));
  },

  // Get leaderboard
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    await delay(600);
    return mockLeaderboard;
  },

  // Update user data (mock)
  async updateDonationAmount(userId: string, amount: number): Promise<User> {
    await delay(300);
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    
    user.totalRaised += amount;
    return user;
  }
};