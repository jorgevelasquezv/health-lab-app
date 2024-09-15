export interface Exam {
  id: string;
  name: string;
  type: string;
  result: string;
  comments: string;
  path?: string;
  date: Date;
  isActive?: boolean;
}
