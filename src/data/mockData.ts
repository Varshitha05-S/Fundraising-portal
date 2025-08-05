import { User, Reward, LeaderboardEntry } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Varshitha Samiappan',
    email: 'varshithasamiappan@gmail.com',
    referralCode: 'varshitha2025',
    totalRaised: 125000,
    joinedDate: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    referralCode: 'sarahc2025',
    totalRaised: 185000,
    joinedDate: '2024-01-10',
    avatar: 'https://images.pexels.com/photos/2106491/pexels-photo-2106491.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

export const mockRewards: Reward[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Raise your first ₹8,000',
    requiredAmount: 8000,
    unlocked: true,
    icon: '🎯',
    category: 'bronze'
  },
  {
    id: '2',
    title: 'Rising Star',
    description: 'Reach ₹80,000 in donations',
    requiredAmount: 80000,
    unlocked: true,
    icon: '⭐',
    category: 'bronze'
  },
  {
    id: '3',
    title: 'Community Champion',
    description: 'Raise ₹4,00,000 for the cause',
    requiredAmount: 400000,
    unlocked: true,
    icon: '🏆',
    category: 'silver'
  },
  {
    id: '4',
    title: 'Fundraising Hero',
    description: 'Achieve ₹8,00,000 milestone',
    requiredAmount: 800000,
    unlocked: true,
    icon: '🚀',
    category: 'silver'
  },
  {
    id: '5',
    title: 'Impact Maker',
    description: 'Cross ₹20,00,000 threshold',
    requiredAmount: 2000000,
    unlocked: false,
    icon: '💎',
    category: 'gold'
  },
  {
    id: '6',
    title: 'Legend',
    description: 'Raise over ₹40,00,000',
    requiredAmount: 4000000,
    unlocked: false,
    icon: '👑',
    category: 'platinum'
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Varshitha Samiappan',
    totalRaised: 185000,
    rank: 1,
    referralCode: 'varshitha2025',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    totalRaised: 125000,
    rank: 2,
    referralCode: 'sarahc2025',
    avatar: 'https://images.pexels.com/photos/2106491/pexels-photo-2106491.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    totalRaised: 98000,
    rank: 3,
    referralCode: 'mikerod2025',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '4',
    name: 'Emma Thompson',
    totalRaised: 75000,
    rank: 4,
    referralCode: 'emmat2025',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '5',
    name: 'David Kim',
    totalRaised: 65000,
    rank: 5,
    referralCode: 'davidk2025',
    avatar: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];