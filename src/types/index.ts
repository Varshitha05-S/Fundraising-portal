export interface User {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  totalRaised: number;
  joinedDate: string;
  avatar?: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  requiredAmount: number;
  unlocked: boolean;
  icon: string;
  category: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  totalRaised: number;
  rank: number;
  avatar?: string;
  referralCode: string;
}