import CoursePage from './CoursePage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import CourseDetailPage from './course-detail-page';

const routes = [
  { path: '/home', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/courses', component: CoursePage },
  { path: '/course/:id', component: CourseDetailPage },
];

export default routes;
