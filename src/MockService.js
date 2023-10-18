import axios from 'axios';

const MockService = (jsonData) => {
  // Set up the API endpoint
  const endpoint = 'http://www.mocky.io/v2/566061f21200008e3aabd919';
  
  // Make the API call using axios
  return axios.post(endpoint, jsonData)
    .then(response => {
      // Handle the response data
      console.log(jsonData)
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      // Handle the error
      console.log(error);
      throw error;
    });
};

export default MockService;