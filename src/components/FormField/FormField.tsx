import { FC, useCallback } from 'react';
import { FormHelperText, FormControl } from '@mui/material';
import {
  useFormContext,
  Controller,
  ControllerRenderProps,
  FieldValues,
  ControllerFieldState,
} from 'react-hook-form';
import { FormQuestion } from '../../types/form';
import { SelectFormField } from './components/SelectFormField';
import { RadioFormField } from './components/RadioFormField';
import { InputFormField } from './components/InputFormField';

interface FormFieldProps {
  question: FormQuestion;
}

enum COMPONENT_TYPES {
  SELECT = 7,
  RADIO = 2,
  INPUT = 0,
}

const formControlStyles = { marginBottom: 2 };

export const FormField: FC<FormFieldProps> = ({ question }) => {
  const { control } = useFormContext();

  const renderField = useCallback(
    (
      field: ControllerRenderProps<FieldValues, string>,
      fieldState: ControllerFieldState,
    ) => {
      switch (question.componentType) {
        case COMPONENT_TYPES.SELECT:
          return (
            <SelectFormField
              question={question}
              field={field}
              error={!!fieldState.error?.message}
            />
          );
        case COMPONENT_TYPES.RADIO:
          return <RadioFormField question={question} field={field} />;
        default:
          return (
            <InputFormField
              question={question}
              field={field}
              error={!!fieldState.error?.message}
            />
          );
      }
    },
    [question],
  );

  return (
    <Controller
      name={question.id}
      control={control}
      rules={{
        required: question.isRequired ? `This field is required` : false,
        ...(question.componentType === COMPONENT_TYPES.INPUT && {
          min: {
            value: 0,
            message: 'Value must be greater than or equal to 0',
          },
        }),
      }}
      render={({ field, fieldState }) => (
        <FormControl
          fullWidth
          error={!!fieldState.error}
          sx={formControlStyles}
        >
          {renderField(field, fieldState)}
          <FormHelperText>
            {fieldState.error?.message || question.description}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
