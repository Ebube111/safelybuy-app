import { axiosWithAuth } from '../auth';
import { baseUrl } from './';

export const signIn = (success, failure, data) => {
  axiosWithAuth()
    .post(`${baseUrl}/api/v1/login`, data)
    .then((response) => success(response))
    .catch((error) => failure(error));
};

export const getUser = (success, failure) => {
  axiosWithAuth()
    .get(`${baseUrl}/api/v1/profile`)
    .then((response) => success(response))
    .catch((error) => failure(error));
};

export const updateProfile = (success, failure, data) => {
  axiosWithAuth()
    .post(`${baseUrl}/api/v1/profile/update`, data)
    .then((response) => success(response))
    .catch((error) => failure(error));
};
