import { Platform } from 'react-native';

const redirectUri = (() => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return 'skillspark://'; // Deep link for mobile
  } else if (window?.location?.origin) {
    return window.location.origin; // For web
  } else {
    return 'exp://localhost:8081'; // Fallback (dev)
  }
})();

const awsConfig: any = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_Ezs4OSAsv',
      userPoolClientId: '2brcigugusu2ta0tpme0dfkktt',
      identityPoolId: undefined,
      region: 'us-east-1',
      loginWith: {
        oauth: {
          domain: 'beta-ashish-auth.auth.us-east-1.amazoncognito.com',
          scope: ['email', 'profile', 'openid'],
          redirectSignIn: redirectUri,
          redirectSignOut: redirectUri,
          responseType: 'token', // or 'code' for more secure flow
        },
        username: true,
      },
    },
  },
};

export default awsConfig;
