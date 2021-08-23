import React from "react";

import Actions from './Actions';

import { BinanceContextProvider } from '../../context';

const ActionsPage = () => {
  return (
    <BinanceContextProvider>     
      <Actions />
    </BinanceContextProvider>   
  );
}

export default ActionsPage;