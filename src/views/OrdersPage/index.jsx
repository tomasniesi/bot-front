import React from "react";

import Orders from './Orders';

import { BinanceContextProvider } from '../../context';

const OrdersPage = () => {
  return (
    <BinanceContextProvider>     
      <Orders />
    </BinanceContextProvider>   
  );
}

export default OrdersPage;