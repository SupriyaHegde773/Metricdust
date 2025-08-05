const awsConfig = {
  aws_project_region: 'us-east-1',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_Ezs4OSAsv',
  aws_user_pools_web_client_id: '2brcigugusu2ta0tpme0dfkktt',
  oauth: {
    domain: 'beta-ashish-auth.auth.us-east-1.amazoncognito.com',
    scope: ['email', 'profile', 'openid'],
    redirectSignIn: 'https://ashish.beta.metricrealties.com',
    redirectSignOut: 'https://ashish.beta.metricrealties.com',
    responseType: 'token',
  },
};
export default awsConfig;
