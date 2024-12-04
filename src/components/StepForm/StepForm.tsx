import { Typography } from '@mui/material';
import { FC } from 'react';
import { FormField } from '../FormField';
import { FormQuestion } from '../../types/form';

interface StepFormProps {
  questions: FormQuestion[];
}

export const StepForm: FC<StepFormProps> = ({ questions }) => {
  if (!questions?.length) {
    return (
      <Typography variant="h6" color="text.secondary">
        No questions available
      </Typography>
    );
  }

  return questions.map((question) => (
    <FormField key={question.id} question={question} />
  ));
};
