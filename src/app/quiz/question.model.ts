export class QuestionModel {
  no: number;
  description: string;
  positive: string[];
  negative: string[];
  answer: 'yes' | 'no' | null;
}
