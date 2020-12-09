import { toast } from 'react-toastify';

const toastFetchErrors = (parsedResult) => {
  const { errors } = parsedResult;
  errors.forEach((error) => {
    toast(error.message, {
      type: 'error',
      autoClose: 5000,
    });
  });
};

export default toastFetchErrors;
