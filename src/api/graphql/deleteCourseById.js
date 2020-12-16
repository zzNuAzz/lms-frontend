import { graphQLFetch } from './graphql-fetch';

const deleteCourse = async (courseId) => {
  const query = `mutation deleteCourse($courseId: Int!) {
    deleteCourse(courseId: $courseId){
      success
      message
    }
  }`;
  const vars = {
    courseId,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default deleteCourse;
