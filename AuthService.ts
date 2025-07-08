import {
  getCurrentUser,
  signOut,
  signUp,
  signIn,
  fetchUserAttributes,
} from 'aws-amplify/auth';

export const AuthService = {
  async signUpWithEmail(email: string, password: string) {
    const res = await signUp({
      username: email,
      password,
      options: {
        userAttributes: { email },
      },
    });
    return res;
  },

  async loginWithEmail(email: string, password: string) {
    const user = await signIn({ username: email, password });
    return user;
  },

  async currentUser() {
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      // ✅ Add this log to confirm user details
      console.log('👤 Fetched user:', user.username, attributes.email);

      return {
        username: user.username,
        email: attributes.email,
      };
    } catch (error) {
      console.error('⚠️ Error in AuthService.currentUser():', error);
      return null;
    }
  },

  async logout() {
    return await signOut();
  },
};
