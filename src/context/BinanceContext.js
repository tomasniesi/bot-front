import React, { createContext, useEffect, useState } from 'react';

import { BinanceService } from '../services';

export const BinanceContext = createContext();

const BinanceContextProvider = ({ children }) => {
    const [coinValues, setCoinValues] = useState([]);
    const [accountInformation, setAccountInformation] = useState({ balances: [] });
    const [allCurrentOpenOrders, setAllCurrentOpenOrders] = useState([]);
    const [myTrades, setMyTrades] = useState([]);
    const [allMyTrades, setAllMyTrades] = useState([]);
    const [accountBalances, setAccountBalances] = useState([]);

    const [serviceError, setServiceError] = useState(null);
        
    useEffect(() => {
        getAccountInformation();
    }, [allCurrentOpenOrders]);

    useEffect(()=>{
        getAllCurrentOpenOrders();
        getAccountBalances();
    }, []);

    BinanceService.setOnMessage((event) => {
        const message = JSON.parse(event.data);
        switch(message.e){
            case '24hrTicker':
                let newCoinValues = [...coinValues];
                let coin = newCoinValues.find(coin => coin.s === message.s);
                if(!coin){
                    newCoinValues.push(message);
                }else{
                    newCoinValues = newCoinValues.map(coinValue => {
                        if(coinValue && coinValue.s === message.s){
                            coinValue = { ...message };
                        } 
                        return coinValue; 
                    });
                }
                setCoinValues(newCoinValues);
                break;
            case 'executionReport':
                getAllCurrentOpenOrders();
                break;
        }
    });

    const getAccountInformation = () => {
        BinanceService.getAccountInformation()
        .then((response) => {
            setAccountInformation(response.data);
        }).catch(error => {
            setServiceError(error);
        });
    }

    const getAllCurrentOpenOrders = (symbol) => {
        BinanceService.getAllCurrentOpenOrders(symbol)
        .then((response) => {
            setAllCurrentOpenOrders(response.data);
        }).catch(error => {
            setServiceError(error);
        });
    }

    const getMyTrades = (symbol, startTime, endTime, limit) => {
        BinanceService.getMyTrades(symbol, startTime, endTime, limit)
        .then((response) => {
            if(response.data && response.data.length > 0){
                setMyTrades(response.data);
            }
        }).catch(error => {
            setServiceError(error);
        });
    }

    const getAllMyTrades = (symbol, startTime, endTime, limit) => {
        BinanceService.getMyTrades(symbol, startTime, endTime, limit)
        .then((response) => {
            if(response.data && response.data.length > 0){
                let trades = [...allMyTrades];
                const trade = trades.find(trade => trade.symbol === response.data[0].symbol);
                if(!trade){
                    trades.push(response.data);
                }
                setAllMyTrades([...trades]);
            }
        }).catch(error => {
            setServiceError(error);
        });
    }

    const createNewOrder = (symbol, side, quantity, price) => {
        BinanceService.createNewOrder(symbol, side, quantity, price)
        .then((response) => {
            setAllCurrentOpenOrders([{ symbol, side, quantity, price }, ...allCurrentOpenOrders]);
        }).catch(error => {
            setServiceError(error);
        });
    }

    const getAccountBalances = () => {
        BinanceService.getAccountBalances()
        .then(response => {
            setAccountBalances(response.data);
        })
        .catch(error => {
            setServiceError(error);
        });
    }

    return (
        <BinanceContext.Provider 
            value={{
                getAccountInformation,
                getAllCurrentOpenOrders,
                getMyTrades,
                getAllMyTrades,
                createNewOrder,
                getAccountBalances,
                accountInformation,
                allCurrentOpenOrders,
                myTrades,
                allMyTrades,
                coinValues,
                accountBalances,
                serviceError
         }}>
            { children }
        </BinanceContext.Provider>
    );
}

export default BinanceContextProvider;