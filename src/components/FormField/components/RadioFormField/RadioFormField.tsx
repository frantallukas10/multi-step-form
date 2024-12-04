import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@mui/material';
import { FC } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { FormQuestion } from '../../../../types/form';

interface RadioFormFieldProps {
  question: FormQuestion;
  field: ControllerRenderProps<FieldValues, string>;
}

export const RadioFormField: FC<RadioFormFieldProps> = ({
  question,
  field,
}) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <FormLabel id={`label-${question.id}`}>
        {question.name}
        {question.isRequired ? ' *' : ''}
      </FormLabel>
      <RadioGroup
        {...field}
        aria-labelledby={`label-${question.id}`}
        name={question.name}
        value={field.value || ''}
        onChange={(event) => field.onChange(event.target.value)}
        row
      >
        {question.answerOptions?.length ? (
          question.answerOptions.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.code}
              control={<Radio />}
              label={option.name}
            />
          ))
        ) : (
          <FormControlLabel
            value=""
            control={<Radio />}
            label="No options available"
            disabled
          />
        )}
      </RadioGroup>
    </Box>
  );
};
