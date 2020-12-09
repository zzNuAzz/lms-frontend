import React,{ useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import AvatarUpload from './AvatarUpload';
import ProfileEditForm from './ProfileEditForm';
import profile from '../../../api/graphql/profile'
import { toast } from 'react-toastify';



export default function ProfileEdit() {
	const [userId, setUserId] = useState(parseInt(localStorage.getItem('userId'), 10));
	const [userProfile, setUserProfile] = useMergeState({});
	
	const fetchUserProfile = () => {
		profile.getProfile(userId).then(result => {
			result.userProfile.isChanged = false;
			setUserProfile(result.userProfile);
	  });
	}

	
	const submitForm = () => {
		profile.editProfile(userProfile).then(result => {
			if(result.updateUserProfile.success) {
				toast.success("Update success");
				fetchUserProfile();
			} else {
				toast.error(result.message);
			}
		});
		
	}
	
	useEffect(fetchUserProfile, []);

	return (
		<Container>
				<Grid container direction="row" justify="space-between" alignItems="flex-end">
					<h2>Edit my profile</h2>
			</Grid>
			<hr></hr>
			<div>
				<div style={{fontSize: "150%"}}>Information</div>
				<div>Let the Coursera community of other learners and instructors recognize you.</div>
				<Grid container>
					<Grid container direction="column" item xs={6}>
						<AvatarUpload userProfile={userProfile} />
					</Grid>
					<Grid container item xs={6}>
						<ProfileEditForm userProfile={userProfile} setUserProfile={setUserProfile} />
					</Grid>
				</Grid>
			</div>

			<div style={{marginTop: "70px"}}>
				<Grid container direction="row" justify="center" alignItems="center">
					<Button size="large" variant="contained" color="secondary" style={{marginRight: "30px", marginLeft: "-15px"}}>
						Cancel 
					</Button>
					<Button size="large" variant="contained" color="primary" disabled={!userProfile.isChanged} onClick={submitForm}>
						Upload Profile 
					</Button>
				</Grid>
			</div>
		</Container>
	);
	
}

function useMergeState(initialState) {
	const [state, setState] = useState(initialState);
	const setMergedState = newState => 
	  setState(prevState => Object.assign({}, prevState, newState)
	);
	return [state, setMergedState];
  }