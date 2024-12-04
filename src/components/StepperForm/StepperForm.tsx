import { useState, useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { StepForm } from '../StepForm';
import { useFetchHandler } from '../../hooks/useFetchHandler';
import {
  getFormConfig,
  submitFormConfig,
} from '../../services/stepFormServices';
import { FormConfig } from '../../types/form';
import { StepperNavigation } from './components/StepperNavigation';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { ModalMessage } from './components/ModalMessage';

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 600,
  margin: '30px auto',
  padding: 3,
  border: '1px solid #ccc',
  borderRadius: 2,
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  bgcolor: 'background.paper',
};

const buttonContainerStyles = {
  marginTop: 2,
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
};

export const StepperForm = () => {
  const {
    data: sections,
    loading,
    error,
  } = useFetchHandler<FormConfig[]>(getFormConfig);
  const [activeStep, setActiveStep] = useState(0);
  const [modalState, setModalState] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const formMethods = useForm<Record<string, string>>({
    defaultValues: {},
    mode: 'onChange',
  });

  const {
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = formMethods;

  const currentStep = useMemo(
    () => sections?.[activeStep],
    [sections, activeStep],
  );

  const handleNext = async () => {
    if (!currentStep) return;

    const isStepValid = await trigger(
      currentStep.formQuestions.map((q) => q.id),
    );
    if (isStepValid) {
      clearErrors();
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = async (data: Record<string, string>) => {
    try {
      await submitFormConfig(data);
      setModalState({
        open: true,
        message: 'Form submitted successfully!',
        severity: 'success',
      });
    } catch {
      setModalState({
        open: true,
        message: 'Failed to submit form.',
        severity: 'error',
      });
    }
  };

  const handleModalClose = () => {
    setModalState((prev) => ({ ...prev, open: false }));
  };

  if (loading) return <LoadingState />;
  if (error || !sections) return <ErrorState error={error} />;

  return (
    <Box sx={{ padding: 2 }}>
      <ModalMessage
        open={modalState.open}
        message={modalState.message}
        severity={modalState.severity}
        onClose={handleModalClose}
      />
      <FormProvider {...formMethods}>
        <StepperNavigation
          activeStep={activeStep}
          sections={sections}
          formErrors={errors}
        />
        <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={formStyles}>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            {currentStep?.name}
          </Typography>
          <StepForm questions={currentStep?.formQuestions || []} />
          <Box sx={buttonContainerStyles}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            {activeStep === sections.length - 1 ? (
              <Button type="submit" variant="contained" disabled={!isValid}>
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                // it depends on the form validation what do you prefer
                // disabled={Object.keys(errors).length > 0 || !isValid}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};
