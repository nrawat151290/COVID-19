import axios from 'axios';
import URLs from './../Configs/URLs';

const apiRequest = function (config = {}, payload = {}, sCB = () => { }, eCB = () => { }) {
  let { url, type } = config;
  if (!url || !type) {
    throw new Error("url & type are mandatory!");
  }
  url = URLs[url];
  if ("get".equalsIgnoreCase(type)) {
    let finalURL = url;
    if (payload && Object.keys(payload).length) {
      const queryString = generateQuerystring(payload);
      finalURL = `${url}?${queryString}`;
    }
    axios.get(finalURL)
      .then(function (response) {
        if (!sCB) {
          return response.data;
        }
        sCB(response.data);
      })
      .catch(function (error) {
        if (!eCB) {
          return error;
        }
        eCB(error);
      });
  } else if ("post".equalsIgnoreCase(type)) {
    if (payload && !Object.keys(payload).length) {
      throw new Error(`payload is mandatory for ${type.toUpperCase()} requests!`);
    }
    axios.post(url, payload).then((response) => {
      if (!sCB) {
        return response.data;
      }
      sCB(response.data);
    }).catch((error) => {
      if (!eCB) {
        console.log(error, typeof error);
        return error;
      }
      eCB(error);
    });
  }
}

const generateQuerystring = (params) => {
  return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

export default apiRequest;