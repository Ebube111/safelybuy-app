import { axiosWithAuth } from "../auth";
import { baseUrl } from "./";

export const getMainDashboard = (success, failure) => {
  axiosWithAuth()
    .get(`${baseUrl}/api/v1/admin/`)
    .then((response) => success(response))
    .catch((error) => failure(error));
};

export const getShoppingDashboard = (success, failure) => {
  axiosWithAuth()
    .get(`${baseUrl}/api/v1/admin/shopping`)
    .then((response) => success(response))
    .catch((error) => failure(error));
};

export const getShoppingOrders = (success, failure) => {
  axiosWithAuth()
    .get(`${baseUrl}/api/v1/admin/orders`)
    .then((response) => success(response))
    .catch((error) => failure(error));
};

export const getShoppingItems = (success, failure) => {
  axiosWithAuth()
    .get(`${baseUrl}/api/v1/admin/items`)
    .then((response) => success(response))
    .catch((error) => failure(error));
};

export const getSellers = (success, failure) => {
  axiosWithAuth()
    .get(`${baseUrl}/api/v1/admin/users/sellers`)
    .then((response) => success(response))
    .catch((error) => failure(error));
}
