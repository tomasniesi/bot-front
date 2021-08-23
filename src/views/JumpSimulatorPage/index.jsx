import React from "react";

import JumpSimulator from './JumpSimulator';

import { BotContextProvider } from '../../context';

const JumpSimulatorPage = () => {
  return (
    <BotContextProvider>     
      <JumpSimulator />
    </BotContextProvider>   
  );
}

export default JumpSimulatorPage;