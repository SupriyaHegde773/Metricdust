import { Platform } from "react-native";
 
const awsConfig: any = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_Ezs4OSAsv",
      userPoolClientId: "2brcigugusu2ta0tpme0dfkktt",
      identityPoolId: undefined,
      region: "us-east-1",
      loginWith: {
        oauth: {
          domain: "beta-ashish-auth.auth.us-east-1.amazoncognito.com",
          scope: [
            "email",
            "profile",
            "openid",
            "aws.cognito.signin.user.admin",
          ],
          redirectSignIn: "https://ashish.beta.metricrealties.com",
          redirectSignOut: "https://ashish.beta.metricrealties.com",
          responseType: "token", // or 'code' for more secure flow
        },
        username: true,
      },
    },
  },
};
 
export default awsConfig;
 