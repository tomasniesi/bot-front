import axios from 'axios';

import BinanceService from './BinanceService';
import CoinService from './CoinService';
import BotConfigService from './BotConfigService';

const axiosInstance = axios.create({
    baseURL: 'http://25.96.189.253:3001/api',
    timeout: 1000 * 60 * 60,
});

console.log(axiosInstance.defaults.timeout)

/*const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.200:3001/api', 
    timeout: 1000 * 60 * 60,
});*/

export {
    axiosInstance,
    BinanceService,
    CoinService,
    BotConfigService,
};