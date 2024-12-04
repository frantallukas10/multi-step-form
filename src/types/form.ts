export interface AnswerOption {
  id: string;
  code: string;
  name: string;
}

export interface Unit {
  id: string;
  name: string;
  abbreviation: string;
}

export interface FormQuestion {
  id: string;
  code: string;
  isRequired: boolean;
  dataType: number;
  componentType: number;
  name: string;
  description: string | null;
  answerOptions?: AnswerOption[];
  // TODO define typescript for childQuestions
  childQuestions?: [];
  unit?: Unit;
}

export interface FormConfig {
  id: string;
  code: string;
  name: string;
  description: string | null;
  formQuestions: FormQuestion[];
}
