import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useCurrentUser from '../Hooks/useCurrentUser';
import DefaultLayout from './DefaultLayout';
export default (props) => {
  const { currentUser } = useCurrentUser();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    }
    return () => {};
  }, [location]);
  return <DefaultLayout {...props}>{props.children}</DefaultLayout>;
};
