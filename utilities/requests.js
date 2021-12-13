import axios from 'axios';
import jwtDecode from 'jwt-decode';

const baseURL = 'https://api.safelybuy.com/api/v1/';

export const LOGIN = 'LOGIN';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const GET_USER = 'GET_USER';

export const isTokenValid = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.safely_buy_token : null;
  if (!token) return false;
  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    decoded = false;
  }
  if (
    !decoded ||
    !decoded.aud ||
    !decoded.jti ||
    !decoded.iat ||
    !decoded.exp ||
    !decoded.sub
  )
    return false;
  return decoded.exp > Date.now() / 1000 ? true : false;
};

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Headers':
      'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type, x-xsrf-token',
    'Access-Control-Allow-Origin': '*',
  },
});

const token =
  typeof window !== 'undefined'
    ? localStorage.getItem('safely_buy_token') || null
    : null;

if (isTokenValid()) {
  axiosInstance.defaults.headers.common = { Authorization: `Bearer ${token}` };
}

export const requests = {
  get: async (url) => {
    try {
      const response = await axiosInstance.get(`${url}`);
      return response.data;
    } catch (e) {
      throw e;
    }
  },

  post: async (url, body, cancel) => {
    try {
      const response = await axiosInstance.post(`${url}`, body, cancel);
      return response.data;
    } catch (e) {
      throw e;
    }
  },

  put: async (url, body, cancel) => {
    try {
      const response = await axiosInstance.put(`${url}`, body, cancel);
      return response.data;
    } catch (e) {
      throw e;
    }
  },

  delete: async (url, body) => {
    try {
      const response = await axios.delete(`${url}`, {
        data: body,
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  },

  deleteWithNoBody: async (url) => {
    try {
      const response = await axios.delete(`${baseURL}${url}`);
      return response.data;
    } catch (e) {
      throw e;
    }
  },
};

export const action = (type, payload) => ({
  type,
  payload,
});

export const loadUser = async (dispatch) => {
  if (isTokenValid()) {
    try {
      const [res, resData] = await Promise.all([
        requests.get('/seller/profile'),
        requests.get('/seller/check'),
      ]);

      const { businessDetails, bankDetails } = resData;
      dispatch(
        action(GET_USER, {
          ...res.user,
          isBusinessDetails: businessDetails,
          isBankDetailsVerified: bankDetails,
        })
      );
    } catch (err) {
      dispatch(action(ERROR, err.message));
    }
  }
};
