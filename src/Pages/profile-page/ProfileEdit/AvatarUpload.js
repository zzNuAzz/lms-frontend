import { Typography } from '@material-ui/core';
import { EvStationSharp } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
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
                toast.success('Upload avatar successful.');
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
            <div className="mr-5 ml-4 mt-5">
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
            <Typography>Avatar</Typography>
        </Fragment>
    );
}
