import axios, { AxiosRequestConfig } from 'axios';
import { ApiEndpoint } from '../../DataTypes/enums';
import { RequestOptions } from '../../interfaces/interface';

// import Cookies from 'js-cookie';
// const chatGptApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const Request = async ({ url, method, slug, data, headers }: RequestOptions) => {
  // const storedAccessToken = Cookies.get('access');  // Retrieve stored access token
  const endpoint = ApiEndpoint[url];
  console.log(method, url,);

  if (!endpoint) {
    console.log(headers);
    throw new Error(`Invalid API endpoint: ${url}`);
  }

  let fullUrl = endpoint.url;
  if (slug) {
    fullUrl += `${slug}`;  // Append additional slug to URL if provided
  }


  const axiosConfig: AxiosRequestConfig = {
    method: endpoint.method,
    url: fullUrl,
    headers: {
      ...endpoint.headers,
      // Use the appropriate Authorization header based on the endpoint type
      // Authorization: endpoint.isChatGpt ? `Bearer ${chatGptApiKey}` : endpoint.withAuth ? `Bearer ${storedAccessToken}` : undefined
    },
  };

  // Check and set appropriate data for non-GET requests
    axiosConfig.data = data;

  try {

    const response = await axios(axiosConfig);

    // Log response data for debugging
    console.log("Response Data:", response.data);

    // Handle unsuccessful response
    if (response.status < 200 || response.status >= 300) {
      const errorText = response.data?.error || response.data?.message  || "Unexpected error occurred.";
      throw new Error(errorText);
    }

      console.log(response);
      

    return response.data;  // Return the response data for further processing
  } catch (error) {

    console.error("Request error:", error);
    throw error;  // Re-throw the error for further handling
  }
};

export default Request;