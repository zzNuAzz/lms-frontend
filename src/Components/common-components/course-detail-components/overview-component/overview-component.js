import { Button } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import ReactHtmlParser from 'react-html-parser';
import updateCourseDescription from '../../../../api/graphql/update-course-description';

const OverviewComponent = ({ currentDescription, fetchCourseDetails }) => {
  const [description, setDescription] = useState(currentDescription);
  const userRole = localStorage.getItem('role');
  const { id } = useParams();

  const editor = useRef(null);
  const editorConfig = {
    readOnly: false,
    minHeight: 500,
    allowResizeX: true,
  };

  const handleDescriptionUpdate = async () => {
    const result = await updateCourseDescription(parseInt(id, 10), description);
    const parsedResult = JSON.parse(result);
    if (parsedResult.data) {
      if (parsedResult.data.updateCourse.success) {
        toast('Successfully updated course description!', {
          type: 'success',
          autoClose: 3000,
        });
        fetchCourseDetails();
      } else {
        toast(parsedResult.data.updateCourse.message, {
          type: 'error',
        });
      }
    } else {
      toast(result, {
        type: 'error',
        autoClose: 5000,
      });
    }
  };

  const DisplayDescription = (
    <div className="course-description">
      {ReactHtmlParser(description)}
    </div>
  );

  const EditDescription = (
    <div className="edit-description" style={{ display: 'flex', flexDirection: 'column' }}>
      <JoditEditor
        value={description}
        ref={editor}
        config={editorConfig}
        onBlur={(newDescription) => setDescription(newDescription.target.innerHTML)}
      />
      <br />
      <div className="update-button" style={{ justifyContent: 'flex-start' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDescriptionUpdate}
        >
          Update
        </Button>
      </div>
    </div>
  );
  return (
    <div className="overview">
      {
        userRole === 'Student' ? DisplayDescription : EditDescription
      }
    </div>
  );
};

export default OverviewComponent;
