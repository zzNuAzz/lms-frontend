import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const updateCourseMember = async (courseMemberId, status, description = '') => {
  const query = `
  mutation updateCourseMember($courseMemberId: Int!, $status: EnrollStatus!, $description: String) {
    updateCourseMember(courseMemberId: $courseMemberId, status: $status, description: $description) {
      success
      message
    } 
  }
`;
  const vars = {
    courseMemberId,
    status,
    description,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default updateCourseMember;
