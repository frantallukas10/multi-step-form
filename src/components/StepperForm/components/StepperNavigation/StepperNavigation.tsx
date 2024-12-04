import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { FC } from 'react';
import { FieldErrors } from 'react-hook-form';
import { FormConfig } from '../../../../types/form';

interface StepperNavigationProps {
  activeStep: number;
  sections: FormConfig[];
  formErrors: FieldErrors<Record<string, string>>;
}

const getOptionalLabel = (
  isStepFailed: boolean,
  description?: string | null,
): JSX.Element | undefined => {
  if (isStepFailed) {
    return (
      <Typography variant="caption" color="error">
        Please fill out all required fields!
      </Typography>
    );
  }

  if (description) {
    return (
      <Typography variant="caption" color="info">
        {description}
      </Typography>
    );
  }

  return undefined;
};

export const StepperNavigation: FC<StepperNavigationProps> = ({
  activeStep,
  sections,
  formErrors,
}) => {
  const hasErrors = !!Object.keys(formErrors).length;

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {sections.map((section, index) => {
          const isStepFailed = activeStep === index && hasErrors;
          const optionalLabel = getOptionalLabel(
            isStepFailed,
            section.description,
          );

          return (
            <Step key={section.id}>
              <StepLabel error={isStepFailed} optional={optionalLabel}>
                {section.name}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};
