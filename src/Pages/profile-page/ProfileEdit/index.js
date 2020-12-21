import React,{ useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import AvatarUpload from './AvatarUpload';
import ProfileEditForm from './ProfileEditForm';
import {getProfile, editProfile} from '../../../api/graphql/profile'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import ChangePassword from './ChangePassword';



export default function ProfileEdit() {
	const [userId, setUserId] = useState(parseInt(localStorage.getItem('userId'), 10));
	const [userProfile, setUserProfile] = useMergeState({});
	const history = useHistory();

	
	const fetchUserProfile = () => {
		getProfile(userId).then(result => {
			result.userProfile.isChanged = false;
			setUserProfile(result.userProfile);
		});
	}

	const cancel = () =>{
		fetchUserProfile();
	}

	
	const submitForm = () => {
		editProfile(userProfile).then(result => {
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
		
		<Container style={{marginTop:'20px'}}>
			<Grid container direction="row" justify="space-between" alignItems="flex-end">
				<h2>Edit my profile</h2>
				<Button size="large" variant="contained" color="primary" onClick={()=>{history.push('/profile/view/'+userId)}}>View Profile</Button>
			</Grid>
			<hr></hr>
			<div>
				<div style={{fontSize: "150%"}}>Information</div>
				<div>Let your friends and teachers recognize you.</div>
				<Grid container>
					<Grid container direction="column" item xs={12} lg={6}>
						<AvatarUpload userProfile={userProfile} />
					</Grid>
					<Grid container item xs={12} lg={6}>
						<ProfileEditForm userProfile={userProfile} setUserProfile={setUserProfile} />
					</Grid>
				</Grid>
			</div>
			<div style={{marginTop: "70px"}}>
				<Grid container direction="row" justify="center" alignItems="center">
					<Button size="large" variant="contained" color="secondary" disabled={!userProfile.isChanged} style={{marginRight: "30px", marginLeft: "-15px"}} onClick={cancel}>
						Cancel 
					</Button>
					<Button size="large" variant="contained" color="primary" disabled={!userProfile.isChanged} onClick={submitForm}>
						Upload Profile 
					</Button>
				</Grid>
			</div>
			<hr></hr>
			<ChangePassword></ChangePassword>
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