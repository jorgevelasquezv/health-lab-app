import { Exam } from './exam.model';

export interface MedicalRecord {
  id: string;
  observations: string;
  path: string;
  exams: Exam[];
}
