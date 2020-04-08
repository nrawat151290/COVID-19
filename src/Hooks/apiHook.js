import React, { useState, useEffect } from 'react';
import ApiRequest from './../Service/ApiRequest';

const useAPI = (config = {}, payload = {}) => {
  const [data, updateData] = useState([]);
  useEffect(() => {
    function fetchData() {
      ApiRequest(config, payload, (response) => {
        updateData(response);
      }, (error) => {
        updateData(error);
      });
    }
    fetchData();
  }, [config.url]);
  return data;
}

export default useAPI;