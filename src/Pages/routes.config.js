import CoursePage from './course-pages/CoursePage';
import HomePage from './home-page/HomePage';
import ForumPage from './forum-page';
import NewThread from './forum-page/NewThread';
import ViewPost from './forum-page/ViewPost';
import { ProfileEdit } from './profile-page';

import LoginPage from './account-control-pages/LoginPage';
import CourseDetailPage from './course-pages/course-detail-pages/course-detail-page';
import SignUpPage from './account-control-pages/SignUpPage';

const defaultConfig = {hasContainer: true, hasNavbar: true, hasFooter: true }

const routes = [
    { path: '/home', component: HomePage, ...defaultConfig },
    { path: '/login', component: LoginPage, ...defaultConfig },
    { path: '/courses', component: CoursePage, ...defaultConfig },
    { path: '/course/:courseId/forum', component: ForumPage, ...defaultConfig, hasContainer: false },
    { path: '/course/:courseId/newthread',  component: NewThread, ...defaultConfig, hasContainer: false },
    // { path: "/course/:courseId/forum/:threadId", component: ViewPost, hasContainer: false },
    { path: '/course/forum/:threadId',  component: ViewPost, ...defaultConfig, hasContainer: false },
    { path: '/course/:id', component: CourseDetailPage, ...defaultConfig },
    { path: '/signup', component: SignUpPage, ...defaultConfig },
    { path: '/profile/edit', component: ProfileEdit, ...defaultConfig },
];

export default routes;
