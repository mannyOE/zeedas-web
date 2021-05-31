import React from 'react';
import PageLoader from '../../../zeedas-components/page-loader';
import { history } from '../../../state/history';
import { store } from '../../../state/redux/store';
import { configActions } from '../../../state/redux/config/actions';

const CheckingRoute = () => {
  const { config } = store.getState();
  const code = new URLSearchParams(window.location.search).get('code');
  const payload = { code };
  store.dispatch(configActions.setCode(payload));

  // eslint-disable-next-line react/prop-types
  history.push(`${config.savedRoute}`);

  return <PageLoader />;
};

export default CheckingRoute;
