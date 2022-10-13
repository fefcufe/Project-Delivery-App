const FIVE = 5;
const ELEVEN = 11;

const emailValidation = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

export const checkLoginValidation = (user) => {
  const { email, password } = user;
  return (emailValidation.test(email) && password.length > FIVE);
};

export const checkRegisterValidation = (user) => {
  const { name, email, password } = user;
  return (
    emailValidation.test(email)
    && password.length > FIVE
    && name.length > ELEVEN
  );
};

export const checkAdmUserCreationValidation = (user) => {
  const { name, email, password, role } = user;
  return (
    emailValidation.test(email)
    && password.length > FIVE
    && name.length > ELEVEN
    && role !== 'default'
  );
};
