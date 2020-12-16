import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import AvatarImageCropper from 'react-avatar-image-cropper';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { uploadAvatar } from '../../../api/graphql/profile';

Avatar.MAX_SIZE = 1024 * 1024 * 5;
Avatar.IMAGE_WIDTH = 400;
Avatar.IMAGE_HEIGHT = 400;

export default function Avatar({ userProfile }) {
    const { pictureUrl, username } = userProfile;
    const history = useHistory();
    console.log(userProfile);
    
    return (
        <Fragment>
            <div className="mr-5 ml-4 mt-5">
                <div
                    style={{
                        backgroundImage: `url(${pictureUrl})`,
                        width: `${Avatar.IMAGE_WIDTH}px`,
                        height: `${Avatar.IMAGE_HEIGHT}px`,
                        margin: 'auto',
                    }}
                >
                </div>
            </div>
            {/* <Typography className="mt-5 mx-auto" variant="h4" bold></Typography> */}
        </Fragment>
    );
}
