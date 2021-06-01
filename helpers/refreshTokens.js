import AsyncStorage from '@react-native-async-storage/async-storage';
import Base64 from 'Base64';

import getTokens from './getTokens';

export const refreshTokens = async () => {
    try {
     const credentials = {
        clientId: '973872075c714d44b7769d58e0908cf0',
        clientSecret: '8ea17c6a22ed4918961f53a1dbc1f40b',
        redirectUri: 'https://auth.expo.io/@/spotify-creator'
    };
      //we wrote this function above
      const credsB64 = Base64.btoa(`${credentials.clientId}:${credentials.clientSecret}`);
      const refreshToken = await AsyncStorage.getItem('refreshToken');


      console.log(refreshToken, "HIT");

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credsB64}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      });

      const responseJson = await response.json();


      console.log(responseJson, 'HIT RESP JSON');
      
      if (responseJson.error) {
        await getTokens();
      } else {
        const {
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
          expires_in: expiresIn,
        } = responseJson;
  
        const expirationTime = new Date().getTime() + expiresIn * 1000;
        await AsyncStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          await AsyncStorage.setItem('refreshToken', newRefreshToken);
        }
        await AsyncStorage.setItem('expirationTime', expirationTime.toString());
      }
    } catch (err) {
      console.error(err)
    }
  }