export interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishDate: Date;
  author: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
}

export interface NewsResponse {
  items: News[];
  total: number;
  page: number;
  pageSize: number;
} 