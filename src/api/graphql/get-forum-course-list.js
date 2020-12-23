import { graphQLFetch } from "./graphql-fetch";

const getForumCourseList = async (userId) => {
  const query = `query getForumCourseList($userId: Int!){
    userCourseList(userId: $userId) {
    	courseList {
        courseId
        name
        description
      }
    	totalPages
    	totalRecords
    	pageNumber
  	}
  
  }`;
  const vars = {
    userId,
  };
  const result = await graphQLFetch(query, vars);
  // console.log("result: ", result);
  return JSON.parse(result).data;
};
export default getForumCourseList;
