import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const getCourseMemberList = async (courseId, status = 'Enrolled', pageNumber = 0, pageSize = 10) => {
  const query = `
  query getCourseMemberList($courseId: Int!, $status: EnrollStatus!) {
    courseMemberList(courseId: $courseId, status: $status) {
      memberList {
        courseMemberId,
        user {
          firstName,
          lastName,
          username
        }
      }
      totalRecords
    }
  }
`;
  const vars = {
    courseId,
    status,
    pageNumber,
    pageSize,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default getCourseMemberList;
