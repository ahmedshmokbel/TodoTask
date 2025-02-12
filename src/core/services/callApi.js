import { Alert, Platform } from 'react-native';
import axios from 'axios';
import store from '../redux/store';
 
export const handleRefreshToken = async () => {

  try {

    var tokenExpireDate = store.getState().login.accessTokenExpirationDate
    var isRefreshTokenSuccess
    // Parse the token expiry date
    const expiryDate = moment(tokenExpireDate);

    // Get the current date using moment
    const currentDate = moment();
    // Check if the token has expired
    const isTokenExpired = currentDate.isAfter(expiryDate);

    if (isTokenExpired) {
      var refreshTokenStore = store.getState().login.refreshToken
      isRefreshTokenSuccess = await refreshToken(refreshTokenStore)
    }
    if (isRefreshTokenSuccess === false) {
      var token = store.getState().login.token
      var idToken = store.getState().login.idToken;
      logoutUser(idToken, token);

    }
  } catch (error) {
    
    store.dispatch(logoutAction())
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Your Session is expired you need to login again ',
      onHide: (() => store.dispatch(logoutAction())),
      position: 'bottom',
      visibilityTime: 3000, // 3 seconds
    });
    return
    
  }
};

const callApi = async (url, method = 'get', data = {}, options) => {
  // await handleRefreshToken()  
  // var token = store.getState().login.token
  let settings= {
    url: 'http://localhost:50003' + url,
    method: method,
    transformResponse: [
      (data) => {
        if (options.parseResult) {
          try {
            return JSON.parse(data);
          } catch (error) {
            
            return data; // Return the raw data if parsing fails
          }
        }
        return data;
      },
    ],
    headers: {
      // Authorization: `Bearer ${token}`,
      'Content-Type': options?.formData === true ? 'multipart/form-data' : 'application/json',
     },
    timeout: options?.formData === true ? 50000 : 30000,
  };
  console.log('URL',settings.url);
  if (method != 'get') {
    settings.data = (data);
  }

  
  return axios(settings)
    .catch(async function (error) {
      return await handleApiError(error, method)

    });
}


export default callApi;



export const handleApiError = async (error, method) => {

  if (error.response) {
    if (error.response.status === 401) {
      await handleRefreshToken();
      return
    }
    
    if (error.response.status === 409) {
    
      return error.response
    }
    else if (error.response.status === 400) {
  
      return error.response
    }
   
  }

  return error;
};
