import axios, {  AxiosResponse } from 'axios';
import { RequestOptions } from '../../interfaces/interface';


const request = async (options: RequestOptions) => {
  try {
    // Serialize data before sending
    if (options.data && typeof options.data !== 'string') {
      options.data = JSON.stringify(options.data);
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
    }

    // Make the HTTP request using axios
    const response: AxiosResponse = await axios({
      ...options,
      url: options.url,
    });

    // Return the parsed response data
    console.log("response",response)

    // todo properly get the api response Data
    return response.data;
    
  } catch (error) {
    // Handle errors gracefully, providing more informative messages if possible
    console.error(`API request error: ${error}`);
    throw error;
  }
};

export default request;