
export interface PricePoint {
  time: string;
  price: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'locked';
  verifiedAt?: string;
  impactScore: number; // Percent boost to trust/valuation
}

export interface Token {
  id: string;
  creatorName: string;
  ticker: string;
  avatarUrl: string;
  videoUrl?: string; // Pitch reel
  socialLink?: string; // Verified social profile (LinkedIn, Portfolio, etc)
  ambition: string;
  price: number;
  floorPrice: number; // Floor price protection
  supply: number;
  marketCap: number;
  holders: number;
  change24h: number;
  history: PricePoint[];
  tags: string[];
  milestones: Milestone[];
}

export interface Index {
  id: string;
  name: string;
  ticker: string;
  description: string;
  price: number;
  change24h: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  composition: string[]; // List of token tickers
}

export interface User {
  id: string;
  name: string;
  walletBalance: number;
  portfolio: PortfolioItem[];
  isCreator: boolean;
  createdTokenId?: string;
}

export interface PortfolioItem {
  tokenId: string;
  amount: number;
  avgBuyPrice: number;
}

export enum ViewState {
  DISCOVER = 'DISCOVER',
  MARKETPLACE = 'MARKETPLACE',
  DASHBOARD = 'DASHBOARD',
  CREATE_TOKEN = 'CREATE_TOKEN',
  TOKEN_DETAIL = 'TOKEN_DETAIL',
  GUIDE = 'GUIDE',
  COMMUNITY = 'COMMUNITY',
}

export interface AmbitionAnalysis {
  score: number;
  summary: string;
  riskFactors: string[];
  bullCase: string;
}
