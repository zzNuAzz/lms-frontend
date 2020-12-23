import { graphQLFetch } from "./graphql-fetch";

// eslint-disable-next-line import/prefer-default-export
const createUserAccount = async (
  username,
  password,
  role,
  firstName,
  lastName,
  phone,
  address,
  birthday
) => {
  const query = `mutation createUserAccount(
    $username: String!
    $password: String!
    $role: UserRole! = Student
    $firstName: String!
    $lastName: String!
    $phone: String
    $address: String
    $birthday: String
){
    createUserAccount(
        user: {
            username: $username
            password: $password
            role: $role
            firstName: $firstName
            lastName: $lastName
            phone: $phone
            address: $address
            birthday: $birthday
        }
    ) {
        userId 
        username
        role
        address
        lastName
        firstName
    }
}`;
  const vars = {
    username,
    password,
    role,
    firstName,
    lastName,
    phone,
    address,
    birthday,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default createUserAccount;
