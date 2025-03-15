import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
const useAuthValidation = () => {
  const token = useSelector((state: RootState) => state?.auth?.token);
  console.log({ token });
  const isUserLoggedIn = token !== null;
  return { isUserLoggedIn, token };
};

export default useAuthValidation;
