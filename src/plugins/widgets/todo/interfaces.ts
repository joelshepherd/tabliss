export interface Settings {
  show: number;
  textAlign: 'inherit' | 'left';
}

export interface Todo {
  id: string;
  contents: string;
  completed: boolean;
}
