import axios from 'axios';
export const getParamValues = (url) => {
    return url
        .slice(1)
        .split('&')
        .reduce((prev, curr) => {
        const [title, value] = curr.split('=');
        prev[title] = value;
        return prev;
        }, {});
}

export const setAuthHeader = () => {
    try {
      const access_token = localStorage.getItem('@accessToken');
      if (access_token) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${access_token}`;
      }
    } catch (error) {
      console.log('Error setting auth', error);
    }
};