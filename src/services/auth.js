export const isAuthenticated = () => {
  const token = localStorage.getItem("@RAuth:token");

  if (token == null) {
    return false;
  }

  return true;
};
