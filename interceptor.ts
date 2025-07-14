import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import { StorageService } from './storageService';
import userJson from './user.json';
const interceptor = (user_alias_id?: string) => {
  const instance = axios.create({
    headers: { 'Content-Type': 'application/json' }
  });

  instance.interceptors.request.use(async (req) => {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken?.toString();

    req.headers.Authorization = token ? `Token ${token}` : 'N/A';
    req.headers.user = user_alias_id || (await StorageService.getData('aliasId'));
    req.headers.tenant = userJson.tenant_name;
    req.headers.apiKey = userJson.api_key.tenant_api_key;

    return req;
  });

  return instance;
};

export default interceptor;
