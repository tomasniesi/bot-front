import { axiosInstance } from './index';

const getJumpSimulation = (percentage, investment, coinName, limit, page) => {
    return axiosInstance.get(`/coins/jump/simulation?percentage=${percentage}${investment ? `&investment=${investment}`: ''}${coinName ? `&name=${coinName}`: ''}${limit ? `&limit=${limit}`: ''}${page ? `&page=${page}`: ''}`);
}

const getCoinsNames = () => {
    return axiosInstance.get(`/coins/historical`);
}

export default {
    getJumpSimulation,
    getCoinsNames,
}