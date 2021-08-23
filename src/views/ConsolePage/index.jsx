import React from "react";

import Console from './Console';

import { BinanceContextProvider } from '../../context';

const ConsolePage = () => {
  return (
    <BinanceContextProvider>     
      <Console />
    </BinanceContextProvider>   
  );
}

export default ConsolePage;