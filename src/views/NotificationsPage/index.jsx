import React from "react";

import Notifications from './Notifications';

import { BinanceContextProvider } from '../../context';

const NotificationsPage = () => {
  return (
    <BinanceContextProvider>     
      <Notifications />
    </BinanceContextProvider>   
  );
}

export default NotificationsPage;