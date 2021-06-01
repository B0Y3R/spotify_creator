import SpotifyWebAPI from 'spotify-web-api-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { refreshTokens } from './refreshTokens';

async function getValidSPObj() {
  const tokenExpirationTime = await AsyncStorage.getItem('expirationTime');
  if (new Date().getTime() > tokenExpirationTime) {
    // access token has expired, so we need to use the refresh token
    await refreshTokens();
  }
  const accessToken = await AsyncStorage.getItem('accessToken');
  var sp = new SpotifyWebAPI();
  await sp.setAccessToken(accessToken);
  return sp;
}


export default getValidSPObj;