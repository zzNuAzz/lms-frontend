import CoursePage from './CoursePage';
import HomePage from './homepage/HomePage';
import LoginPage from './LoginPage';
import CourseDetailPage from './course-detail-page';
import SignUpPage from './SignUpPage';

const routes = [
  { path: '/home', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/courses', component: CoursePage },
  { path: '/course/:id', component: CourseDetailPage },
  { path: '/signup', component: SignUpPage },
];

export default routes;
