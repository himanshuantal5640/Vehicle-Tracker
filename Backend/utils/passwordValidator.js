export const validatePassword = (password) => {
  if (password.length < 8) return "Minimum 8 characters required";
  if (!/[A-Z]/.test(password)) return "Must include uppercase";
  if (!/[a-z]/.test(password)) return "Must include lowercase";
  if (!/[0-9]/.test(password)) return "Must include number";
  if (!/[@$!%*?&]/.test(password)) return "Must include special character";
  return null;
};