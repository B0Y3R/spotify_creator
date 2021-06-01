import Base64 from 'Base64';
import AsyncStorage from '@react-native-async-storage/async-storage';

import getAuthorizationCode from './getAuthorizationCode';

const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode()
    const credentials = {
        clientId: '973872075c714d44b7769d58e0908cf0',
        clientSecret: '8ea17c6a22ed4918961f53a1dbc1f40b',
        redirectUri: 'https://auth.expo.io/@jollyrogertelephone/spotify-creator'
    };
    //we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
    const credsB64 = Base64.btoa(`${credentials.clientId}:${credentials.clientSecret}`);

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${credentials.redirectUri}`,
    });

    const responseJson = await response.json();


    console.log(responseJson, "HTI GET TOKENS ")
    // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;


    const expirationTime = new Date().getTime() + expiresIn * 1000;
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('expirationTime', expirationTime.toString());

  } catch (err) {
    console.error(err);
  }
}

export default getTokens;