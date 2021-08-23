import React, { createContext, useEffect, useState } from 'react';

import { 
    CoinService,
    BotConfigService, 
} from '../services';

export const BotContext = createContext();

const BotContextProvider = ({ children }) => {
    const [serviceError, setServiceError] = useState(null);
    const [jumpsSimulations, setJumpsSimulations] = useState([]);
    const [coinsNames, setCoinsNames] = useState([]);
    const [botConfig, setBotConfig] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        getCoinsNames();
        getBotConfig();
    }, []);

    const getJumpSimulation = (percentage, investment, coinName, limit, page) => {
        setFetching(true);
        return CoinService.getJumpSimulation(percentage, investment, coinName, limit, page)
        .then((response) => {
            setJumpsSimulations(response.data);
            setFetching(false);
        }).catch(error => {
            setServiceError(error);
            setFetching(false);
        });
    }

    const getCoinsNames = () => {
        CoinService.getCoinsNames().then((response) => {
            setCoinsNames(response.data);
        }).catch(error => {
            setServiceError(error);
        });
    }

    const getBotConfig = () => {
        BotConfigService.getBotConfig()
        .then((response) => {
            setBotConfig(response.data);
        }).catch(error => {
            setServiceError(error);
        });
    }

    const updateBotConfig = (botConfig) => {
        CoinService.updateBotConfig(botConfig)
        .then((response) => {
            setBotConfig(response.data);
        }).catch(error => {
            setServiceError(error);
        });
    }

    return (
        <BotContext.Provider 
            value={{
                getJumpSimulation,
                getCoinsNames,
                getBotConfig,
                updateBotConfig,
                jumpsSimulations,
                coinsNames,
                botConfig,
                fetching,
                serviceError
         }}>
            { children }
        </BotContext.Provider>
    );
}

export default BotContextProvider;

