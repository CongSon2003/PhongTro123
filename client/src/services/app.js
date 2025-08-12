import axiosConfig from "../axiosConfig";
import axiosDefault from "axios";
export const apiGetPrices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/price/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAcreage = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/acreage/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/province/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: "https://vapi.vnappmob.com/api/province/",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicDistrict = (province_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: `https://vapi.vnappmob.com/api/province/district/${province_id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicWard = (district_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: `https://vapi.vnappmob.com/api/province/ward/${district_id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
