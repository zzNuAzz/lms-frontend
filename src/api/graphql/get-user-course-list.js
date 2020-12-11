import { graphQLFetch } from './graphql-fetch';

const getUserCourseList = async ({ userId, status = 'Accepted', pageSize = 10, pageNumber = 0 }) => {
  const query = `query userCourseList (
    $userId: Int!
    $status: EnrollStatus = Accepted
    $pageNumber: Int = 0
    $pageSize: Int = 10
) {
    userCourseList (
        userId: $userId
        status: $status
        pageNumber: $pageNumber
        pageSize: $pageSize
    ) {
        courseList {
          courseId
          name
          description
          host {
            userId
            username
            pictureUrl
          }
        }
        status
        totalRecords
        pageNumber
        totalPages
    }
}
`;
  const variables = {
    userId,
    status,
    pageSize,
    pageNumber,
  };
  const result = await graphQLFetch(query, variables);
  return result;
};

export default getUserCourseList;
