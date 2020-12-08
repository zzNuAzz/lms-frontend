import CoursePage from './course-pages/CoursePage';
import HomePage from './HomePage';
import LoginPage from './account-control-pages/LoginPage';
import CourseDetailPage from './course-pages/course-detail-pages/course-detail-page';
import SignUpPage from './account-control-pages/SignUpPage';

const routes = [
  { path: '/home', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/courses', component: CoursePage },
  { path: '/course/:id', component: CourseDetailPage },
  { path: '/signup', component: SignUpPage },
];

export default routes;
