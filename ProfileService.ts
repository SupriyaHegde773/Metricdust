import config from './config.json';
import interceptor from './interceptor';
import userJson from './user.json';

export const ProfileService = {
  async getUserAliasIDByEmail(email: string) {
    const instance = interceptor();
    const url = config.getAliasIdUrl
      .replace('<tenant>', userJson.tenant_name)
      .replace('<user_email>', email);

    console.log('Calling Alias API:', url); // ✅ log correct variable

    const response = await instance.get(url);
    console.log('Alias API response:', response.data);
    return response.data;
  },

  async getProfileDetails(email: string, aliasId: string) {
    const instance = interceptor(aliasId);
    const url = config.profileUrl
      .replace('<tenant>', userJson.tenant_name)
      .replace('<user_alias>', aliasId);

    console.log('Calling Profile API:', url); // Optional logging

    const response = await instance.post(url, { email });
    return response.data;
  }
};
