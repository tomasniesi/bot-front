import React from "react";

import FarmConfiguration from './FarmConfiguration';

import { BotContextProvider } from '../../context';

const FarmConfigurationPage = () => {
  return (
    <BotContextProvider>     
      <FarmConfiguration/>
    </BotContextProvider>   
  );
}

export default FarmConfigurationPage;