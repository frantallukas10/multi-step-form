import { InputLabel, Select, MenuItem } from '@mui/material';
import { FC } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { FormQuestion } from '../../../../types/form';

interface SelectFormFieldProps {
  question: FormQuestion;
  field: ControllerRenderProps<FieldValues, string>;
  error?: boolean;
}

const placeholderStyle = { color: 'rgba(0, 0, 0, 0.38)', fontStyle: 'italic' };

export const SelectFormField: FC<SelectFormFieldProps> = ({
  question,
  field,
  error,
}) => {
  return (
    <>
      <InputLabel id={`label-${question.id}`} shrink>
        {question.isRequired ? `${question.name} *` : question.name}
      </InputLabel>
      <Select
        {...field}
        name={question.id}
        required={question.isRequired}
        labelId={`label-${question.id}`}
        label={question.name}
        error={error}
        value={field.value || ''}
        displayEmpty
        renderValue={(selected) =>
          selected === '' ? (
            <span style={placeholderStyle}>Select one option</span>
          ) : (
            selected
          )
        }
      >
        <MenuItem value="" disabled>
          <em>Select one option</em>
        </MenuItem>
        {question.answerOptions?.length ? (
          question.answerOptions.map((option) => (
            <MenuItem key={option.id} value={option.code}>
              {option.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No options available</MenuItem>
        )}
      </Select>
    </>
  );
};
