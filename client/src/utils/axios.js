import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

const axiosInst = axios.create({
    baseURL
});

axiosInst.interceptors.request.use(
    config => {
        const jwtoken = localStorage.getItem('jwtoken');
        if (jwtoken) {
            config.headers.Authorization = `Bearer ${jwtoken}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axiosInst.interceptors.response.use(
    response => {
        return response;
    }
    , (error) => {
        if (error) {
            localStorage.removeItem('jwtoken');
        }
        return Promise.reject(error);
    }
)

export { axiosInst };