import { InputLabel, TextField, InputAdornment } from '@mui/material';
import { FC } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { FormQuestion } from '../../../../types/form';

interface InputFormFieldProps {
  question: FormQuestion;
  field: ControllerRenderProps<FieldValues, string>;
  error?: boolean;
}

export const InputFormField: FC<InputFormFieldProps> = ({
  question,
  field,
  error,
}) => (
  <>
    <InputLabel id={`label-${question.id}`} shrink>
      {question.name}
    </InputLabel>
    <TextField
      {...field}
      required={question.isRequired}
      type={question.componentType === 0 ? 'number' : 'text'}
      label={question.name}
      error={error}
      placeholder="Enter your answer"
      fullWidth
      value={field.value || ''}
      slotProps={{
        input: {
          endAdornment: question.unit && (
            <InputAdornment position="end">{question.unit.name}</InputAdornment>
          ),
        },
        inputLabel: {
          shrink: true,
        },
      }}
    />
  </>
);
