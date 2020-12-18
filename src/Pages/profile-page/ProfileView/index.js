import React,{ useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Container, IconButton } from '@material-ui/core';
import Avatar from './Avatar';
import ProfileForm from './ProfileForm';
import {getProfile, editProfile} from '../../../api/graphql/profile'
import { toast } from 'react-toastify';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { useHistory, useParams } from 'react-router-dom';



export default function ViewProfile() {
	const [currentUserId] = useState(parseInt(localStorage.getItem('userId'), 10));
	const [userProfile, setUserProfile] = useMergeState({});
	const history = useHistory();
	const {userId} = useParams();

	
	const fetchUserProfile = () => {
		getProfile(parseInt(userId, 10)).then(result => {
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
					<h2>Profile</h2>
					{ (userId==currentUserId) ?
					<IconButton onClick={()=>{history.push('/profile/edit')}}>
							<BorderColorIcon style={{color: 'black'}} fontSize="large"></BorderColorIcon>
					</IconButton>
					: null	
					}
			</Grid>
			<hr></hr>
			<div>
				<div style={{fontSize: "150%"}}>Information</div>
				<div>Let the Learning Management System community of other learners and instructors recognize you.</div>
				<Grid container>
					<Grid container direction="column" item xs={6} >
						<Avatar userProfile={userProfile} />
					</Grid>
					<Grid container item xs={6} style={{marginTop: '25px'}}>
						<ProfileForm userProfile={userProfile} setUserProfile={setUserProfile} />
					</Grid>
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