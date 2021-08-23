import React from "react";

import Dashboard from './Dashbaord';

import { BinanceContextProvider, BotContextProvider } from '../../context';

const DashboardPage = () => {
  return (
      <BotContextProvider>
        <BinanceContextProvider>     
          <Dashboard />
        </BinanceContextProvider>
      </BotContextProvider>
  );
}

export default DashboardPage;