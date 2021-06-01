import * as AuthSession from 'expo-auth-session';

const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];

const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
  try {
    const credentials = {
        clientId: '973872075c714d44b7769d58e0908cf0',
        clientSecret: '8ea17c6a22ed4918961f53a1dbc1f40b',
        redirectUri: 'https://auth.expo.io/@jollyrogertelephone/spotify-creator'
    };
   
    const result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        credentials.clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(credentials.redirectUri),
    });


    return result.params.code;

  } catch (err) {
    console.error(err)
  }
}

export default getAuthorizationCode;