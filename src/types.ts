export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  commission: string;
  variation: string;
  viralVideos: number;
  aiScore: number;
  price: string;
  shop: string;
  sales: string;
  trend: 'Low' | 'Medium' | 'High';
  recommendation: string;
  revenue: string;
  priceRange?: string;
  affiliatePotential?: number;
  creatorConversion?: string;
  liveRevenuePercent?: number;
  videoRevenuePercent?: number;
  cardRevenuePercent?: string;
  concentration?: string;
  ugcSourcePercent?: number;
  liveSourcePercent?: number;
  affiliateLink?: string;
}

export interface Video {
  id: string;
  thumbnail: string;
  views: string;
  productName: string;
  publishedAt: string;
  likes: string;
  comments: string;
  description: string;
  hashtags: string[];
  url: string;
  type: string[]; // UGC, POV, Review, etc.
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  teacher: string;
  date: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  order: number;
}
