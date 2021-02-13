import axios from 'axios';
import { setAuthHeader } from './functions';

export const get = async (url, params) => {
  setAuthHeader();
  const result = await axios.get(url, params).catch(err => {
    console.log(err);
    return err;
  });
  return result.data;
};