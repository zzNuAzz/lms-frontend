import axios from 'axios';

const graphqlSingleUpload = async (file) => {
  const data = new FormData();
  console.log(file);

  //* Operation field
  const query = `
  mutation uploadSingleFile($file: Upload!) {
    uploadFileSingle(file: $file) {
      filename
      mimetype
      uuid
    }
  }
  `;

  const variables = {
    file: null,
  };
  data.append('operations', JSON.stringify({ query, variables }));

  //* Map field
  const map = {
    0: ['variables.file'],
  };
  data.append('map', JSON.stringify(map));

  //* File field
  data.append('0', file[0]);

  //* Send data to server
  const response = await axios({
    url: '/api/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
    data,
  });
  console.log(response);
};

export default graphqlSingleUpload;
