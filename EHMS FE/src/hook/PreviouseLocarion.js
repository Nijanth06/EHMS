import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const usePreviousLocationState = () => {
  const location = useLocation();
  const [previousLocationState, setPreviousLocationState] = useState(null);

  useEffect(() => {
    setPreviousLocationState(location.state);
  }, [location]);

  return previousLocationState;
};
