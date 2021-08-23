import { axiosInstance } from './index';

// Create WebSocket connection.
const socket = new WebSocket('ws://25.96.189.253:8080');
//const socket = new WebSocket('ws://192.168.0.200:8080');

const setOnMessage = (onMessageCallback) => {
    socket.onmessage = (event) => onMessageCallback(event);
}

const getCoinData = (symbol) => {
    return axiosInstance.get(`/binance/coinData?symbol=${symbol}`);
}

const getAccountInformation = () => {
    return axiosInstance.get(`/binance/accountInformation`);
}

const cancelAllOrders = (symbol) => {
    return axiosInstance.delete(`/binance/cancelAllOrders?symbol=${symbol}`);
}

const createNewOrder = (symbol, side, quantity, price) => {
    return axiosInstance.post(`/binance/newOrder?symbol=${symbol}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${price}`);
}

const getMyTrades = (symbol, startTime, endTime, limit) => {
    return axiosInstance.get(`/binance/myTrades?${symbol ? `symbol=${symbol}` : ''}${startTime ? `&startTime=${startTime}` : ''}${endTime ? `&endTime=${endTime}` : ''}${limit ? `&limit=${limit}` : ''}`);
}

const getAllCurrentOpenOrders = (symbol) => {
    return axiosInstance.get(`/binance/currentOpenOrders?${symbol ? `&symbol=${symbol}` : ''}`);
}

const getNotificationNumbers = (symbol) => {
    return axiosInstance.get(`/binance/coinData?symbol=${symbol}`);
}

const createNotificationNumbers = (notificationNumber) => {
    return axiosInstance.post(`/notificationNumbers`, notificationNumber);
}

const getAccountBalances = () => {
    return axiosInstance.get(`/binance/accountBalances`);
}

export default {
    getCoinData,
    getAccountInformation,
    cancelAllOrders,
    createNewOrder,
    getMyTrades,
    getAllCurrentOpenOrders,
    getNotificationNumbers,
    createNotificationNumbers,
    setOnMessage,
    getAccountBalances,
}