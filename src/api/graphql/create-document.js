import axios from 'axios';

const createDocument = async (document, files) => {
  const data = new FormData();

  //* Operation field
  const query = `
  mutation createDocument($document: DocumentInput!) {
    createDocument(document: $document) {
      success
      insertedId
      message
    }
  }
  `;

  const filesNull = [];
  const map = {};
  for (let i = 0; i < files.length; ++i) {
    filesNull.push(null);

    //* Map field
    map[i] = [
      `variables.files.${i}`,
    ];
  }

  const tempVar = document;
  tempVar.files = filesNull;

  const variables = {
    document: tempVar,
  };
  data.append('operations', JSON.stringify({ query, variables }));

  //* Map field
  data.append('map', JSON.stringify(map));

  //* Files field
  for (let i = 0; i < files.length; i++) {
    data.append(i, files[i]);
  }

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

export default createDocument;
