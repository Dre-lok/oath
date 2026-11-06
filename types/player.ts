export type ClassType = 'recruit' | 'warrior' | 'kaizen';

export interface Player {
  id: string;
  class: ClassType;
  createdAt: string;
  difficulty: 'standard' | 'hardcore';
}
