import { ValidationError } from 'yup';

interface ErrorObject {
  [key: string]: string;
}

export const mapValidationErrorToErrorObject = (
  validationError: ValidationError,
): ErrorObject => {
  const errors: ErrorObject = {};
  validationError.inner.forEach(error => {
    errors[error.path] = error.message;
  });
  return errors;
};
