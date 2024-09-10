export interface APINewsResponse {
  status:       string;
  totalResults: number;
  articles:     Article[];
}

export interface Article {
  id?:         string;
  source:      Source;
  author:      null | string;
  title:       string;
  description: string;
  url:         string;
  urlToImage:  null | string;
  publishedAt: Date;
  content:     string;
}

export interface Source {
  id:   null | string;
  name: string;
}
