// types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Main: undefined;
  Home: undefined;
  Quiz: undefined;
  Profile: undefined;
  Roadmap: undefined;
  Achievements: undefined;
  Authorized: undefined;
  Coursefeed: undefined;
  Courses: { query: string };
  CourseDetail: { id: string };
  CourseList: { query: string };
  CourseSearch: { query: string };
  InterestQuiz: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
