import { axiosInstance } from './index';

const getBotConfig = () => {
    return axiosInstance.get(`/bot/configuration`);
}

const updateBotConfig = (botConfig) => {
    return axiosInstance.put(`/bot/configuration`, botConfig);
}

export default {
    getBotConfig,
    updateBotConfig,
}