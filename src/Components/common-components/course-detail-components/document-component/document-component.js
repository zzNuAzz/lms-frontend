import React, { useEffect, useState } from 'react';
import {
  Typography,
  makeStyles,
  LinearProgress,
} from '@material-ui/core';
import CreateDocumentComponent from './create-document-component/create-document-component';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getDocumentList from '../../../../api/graphql/get-document-list';
import toastFetchErrors from '../../../tools/toast-fetch-errors';
import DocumentItem from './document-item/document-item';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const DocumentComponent = ({ courseId }) => {
  const classes = useStyles();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const role = localStorage.getItem('role') || '';

  const fetchDocuments = async () => {
    try {
      const result = await getDocumentList(parseInt(courseId, 10));
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.documentList.documentList.length !== 0) {
          setDocuments(parsedResult.data.documentList.documentList);
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const fetch = async () => {
    setLoading(true);
    await fetchDocuments();
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const RenderComponent = (
    <div className="documents">
      {
        role === 'Teacher'
          ? (
            <>
              <CreateDocumentComponent courseId={courseId} fetchDocuments={fetch} />
              <br />
              <br />
            </>
          )
          : null
      }
      {
        documents.length === 0
          ? (
            <div className="no-documents" style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h6">There are no documents to show!</Typography>
            </div>
          )
          : documents.map((document) => (
            <DocumentItem document={document} fetchDocuments={fetch} />
          ))
      }
    </div>
  );

  return (
    <>
      <div className={classes.title}>
        <Typography variant="h3">Documents</Typography>
      </div>
      <hr />
      {
        isLoading
          ? <LinearProgress />
          : RenderComponent
      }
    </>
  );
};

export default DocumentComponent;
