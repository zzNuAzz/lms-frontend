import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const getCourseMemberList = async (courseId, status, pageNumber = 0, pageSize = 100) => {
  const query = `
  query getCourseMemberList($courseId: Int!${status ? ", $status: EnrollStatus!" : ""}) {
    courseMemberList(courseId: $courseId${status ?", status: $status" : ""}) {
      memberList {
        courseMemberId,
        status
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
  if(!status) delete vars.status;
  const result = await graphQLFetch(query, vars);
  return result;
};

export default getCourseMemberList;
