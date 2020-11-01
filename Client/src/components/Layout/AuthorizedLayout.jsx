import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useCurrentUser from '../Hooks/useCurrentUser';
import DefaultLayout from './DefaultLayout';

export default (props) => {
  const { getCurrentUser } = useCurrentUser();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      history.push('/login');
    }
    return () => {};
  }, [getCurrentUser, history, location]);
  return <DefaultLayout {...props}>{props.children}</DefaultLayout>;
};
