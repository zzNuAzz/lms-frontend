import { DescriptionRounded, ImageRounded } from '@material-ui/icons';
import React from 'react';

const FileExtensionIcon = ({ filename }) => {
  const imageExtensions = [
    'png',
    'jpg',
    'jpeg',
    'bmp',
    'gif',
    'tiff',
    'psd',
  ];

  const getFileExtension = () => {
    const temp = filename.split('.');
    return temp[temp.length - 1];
  };

  const fileExtension = getFileExtension();

  const isImageExtension = () => {
    return imageExtensions.includes(fileExtension);
  };

  console.log(fileExtension);

  return (
    <>
      {
        isImageExtension()
          ? <ImageRounded />
          : <DescriptionRounded />
      }
    </>
  );
};

export default FileExtensionIcon;
