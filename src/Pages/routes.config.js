import CoursePage from './course-pages/CoursePage';
import HomePage from './home-page/HomePage';
import ForumPage from './forum-page';
import NewThread from './forum-page/NewThread';
import ViewPost from './forum-page/ViewPost';
import { ProfileEdit } from './profile-page';

import LoginPage from './account-control-pages/LoginPage';
import CourseDetailPage from './course-pages/course-detail-pages/course-detail-page';
import SignUpPage from './account-control-pages/SignUpPage';

const routes = [
  { path: '/home', component: HomePage, hasContainer: true },
  { path: '/login', component: LoginPage, hasContainer: true },
  { path: '/courses', component: CoursePage, hasContainer: true },
  { path: '/course/:courseId/forum', component: ForumPage, hasContainer: false },
  { path: '/course/:courseId/newthread', component: NewThread, hasContainer: false },
  // { path: "/course/:courseId/forum/:threadId", component: ViewPost, hasContainer: false },
  { path: '/course/forum/:threadId', component: ViewPost, hasContainer: false },
  { path: '/course/:id', component: CourseDetailPage, hasContainer: true },
  { path: '/signup', component: SignUpPage, hasContainer: true },
  { path: '/profile/edit', component: ProfileEdit, hasContainer: true}
];

export default routes;
