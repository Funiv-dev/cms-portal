"use client";

import axios from 'axios';
import getConfig from '../../config/config';

export default class AxiosProdiver {
  public static instance: AxiosProdiver;

  public constructor() {}

  public static getInstance(): AxiosProdiver {
    if (!AxiosProdiver.instance) {
      AxiosProdiver.instance = new AxiosProdiver();
    }
    return AxiosProdiver.instance;
  }

  public getAxiosInstance() {
    return this.axiosInstance();
  }

  public axiosInstance() {
    const config = getConfig();
  
    const instance = axios.create({
      baseURL: config.apiBaseUrl,
      timeout: config.apiTimeout,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiToken}`,
      },
    });

    console.log(config.apiBaseUrl);

    instance.interceptors.response.use(
      (response) => {
        console.log('Response:', response);
        return response;
      },
      (error) => {
        console.error('Response Error', error);
        return Promise.reject(error);
      }
    );
  
    return instance;
  }

  public get(url: string, params = {}) {
    const instance = this.axiosInstance();
  
    instance.get(url, { params })
    .then(response => {
      if (response.status === 200) {
        console.log("GET request successful:", response.data);
  
        return response.data;
      } else {
        console.error("Unexpected response status:", response.status);
      }
    })
    .catch(error => {
      console.error("Error in POST request:", error);
    });
  }
  
  public post(url: string, data = {}) {
    const instance = this.axiosInstance();
  
    instance.post(url, data)
    .then(response => {
      if (response.status === 200) {
        console.log("POST request successful:", response.data);
  
        return response.data;
      } else {
        console.error("Unexpected response status:", response.status);
      }
    })
    .catch(error => {
      console.error("Error in POST request:", error);
    });
  };
}