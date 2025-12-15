
export type Category = 'Appearance' | 'Phone' | 'PeoplePleaser' | 'Perfectionist';

export interface Question {
  id: number;
  text: string;
  category: Category;
}

export interface DollProfile {
  id: Category;
  name: string;
  description: string;
  color: string;
  icon: string; // Using generic names for lucide icons
  imageUrl: string; // Added image URL support
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, number>; // questionId -> score (1-5)
  isCompleted: boolean;
}

export interface AnalysisResult {
  dominantCategory: Category;
  scores: Record<Category, number>;
  advice: string;
  actionItems: string[];
}
