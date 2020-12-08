import CoursePage from './CoursePage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import CourseDetailPage from './course-detail-page';
import SignUpPage from './SignUpPage';
import Profile from './profile';

const routes = [
  { path: '/home', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/courses', component: CoursePage },
  { path: '/course/:id', component: CourseDetailPage },
  { path: '/signup', component: SignUpPage },
  { path: '/profile/:id', component: Profile}
];

export default routes;
