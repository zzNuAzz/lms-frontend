import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import AvatarImageCropper from 'react-avatar-image-cropper';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { uploadAvatar } from '../../../api/graphql/profile';

AvatarUpload.MAX_SIZE = 1024 * 1024 * 5;
AvatarUpload.IMAGE_WIDTH = 400;
AvatarUpload.IMAGE_HEIGHT = 400;

export default function AvatarUpload({ userProfile }) {
    const { pictureUrl } = userProfile;
    const history = useHistory();
    const apply = file => {
        uploadAvatar(file).then(result => {
            if (result?.success) {
                history.push('/profile');
                toast.success('Upload avatar successful.', {
                    autoClose: 3000,
                });
            } else {
                toast.error(
                    result?.message ? result?.message : 'Upload failed.'
                );
            }
        });
    };
    const errorHandler = type => {
        switch (type) {
            case 'not_image':
                toast.error('Avatar must be image.');
                break;
            case 'maxsize':
                toast.error('Max file size is 5MB.');
                break;
            default:
                toast.error(type);
        }
    };
    return (
        <Fragment>
            {/* <div className="mr-5 ml-4 mt-5"> */}
            <div  className="mt-5">
                <div
                    style={{
                        backgroundImage: `url(${pictureUrl})`,
                        width: `${AvatarUpload.IMAGE_WIDTH}px`,
                        height: `${AvatarUpload.IMAGE_HEIGHT}px`,
                        margin: 'auto',
                    }}
                >
                    <AvatarImageCropper
                        apply={apply}
                        errorHandler={errorHandler}
                        maxsize={AvatarUpload.MAX_SIZE}
                        isBack={true}
                    />
                </div>
            </div>
            <Typography className="mt-5 mx-auto" variant="h4" bold>Avatar</Typography>
        </Fragment>
    );
}
