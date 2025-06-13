"use client";

import axios from 'axios';
import getConfig from '../../config/config';

function postAxios() {
  
  const config = getConfig();
  const instance = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: config.apiTimeout,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiToken}`,
    },
  });

  return instance;
}

function getAxios() {
  
  const config = getConfig();
  const instance = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: config.apiTimeout,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiToken}`,
    },
  });

  return instance;
}