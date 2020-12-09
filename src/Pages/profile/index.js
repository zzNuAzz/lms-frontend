import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Avatar, Container, Drawer } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import profile from '../../api/graphql/profile';
import ChangePassword from './ChangePassword';

const editHeader = () => {
    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
        >
            <h2>Edit my profile</h2>
            {/* <Button size="large" variant="contained" color="primary">
                Upload Profile
            </Button> */}
        </Grid>
    );
};

// const useStyles = makeStyles((theme) => ({
//     root: {
	
// 	}, 
// 	label: {
// 		paddingRight: "1rem"
// 	},
// 	bold:{
// 		fontWeight: "bold"
// 	}
// }));



class ProfileEdit extends Component {
	constructor(props){
		super(props);
		this.state = {
			userId: parseInt(sessionStorage.getItem('userId'), 10),
			userProfile: {},
		}
	}

	getProfile(){
		profile.getProfile(this.state.userId)
			.then(data => this.setState({userProfile: data.userProfile}));	
	}

	componentDidMount(){
		this.getProfile();	
	}

	editProfile= () => {
		profile.editProfile(this.state.userProfile);
		this.getProfile();
	}

	handleChangePhone = (event) => {
		let up = this.state.userProfile;
		up.phone = event.target.value;
		this.setState({
			userProfile: up
		})
	}

	handleChangeFirstName = (event) => {
		let up = this.state.userProfile;
		up.firstName = event.target.value;
		this.setState({
			userProfile: up
		})
	}

	handleChangeLastName = (event) => {
		let up = this.state.userProfile;
		up.lastName = event.target.value;
		this.setState({
			userProfile: up
		})
	}

	handleChangeAddress = (event) => {
		let up = this.state.userProfile;
		up.address = event.target.value;
		this.setState({
			userProfile: up
		})
	}

	handleChangeBirthday = (event) => {
		let up = this.state.userProfile;
		up.birthday = event.target.value;
		this.setState({
			userProfile: up
		})
	}

	handleChangeEmail = (event) => {
		let up = this.state.userProfile;
		up.email = event.target.value;
		this.setState({
			userProfile: up
		})
	}
	
	render(){
		console.log(this.state.userProfile);

		let self = this;
	
		return (
			<Container>
				{editHeader()}
				<hr></hr>
				<div>
					<div style={{fontSize: "150%"}}>Information</div>
					<div>Let the Coursera community of other learners and instructors recognize you.</div>
					<Grid container>
						<Grid
							style={{marginTop: "25px", paddingLeft: "50px"}}
							container
							direction="column"
							item
							xs={6}
						>
							<Grid container direction="row"> 
								<Grid item container xs={2} justify="flex-end" alignItems="flex-start" style={{paddingRight: "1rem",fontWeight: "bold" }} >Photo Profile</Grid>
								<Grid item container xs={8} alignItems="flex-start">
									<img src={"/Avatar.jpg"} style={{width:"80%",heigh:"80%"}}/>
								</Grid>
							</Grid>
							<Grid style={{marginTop: "20px", marginLeft:"29%"}}>
								<Button size="large" variant="contained" color="primary">
									Upload Photo 
								</Button>
							</Grid>
						</Grid>
						<Grid 
							container 
							item
							xs={6}
						>
							<Grid
								style={{marginTop: "25px"}}
								container
								direction="row"
							>
								<Grid item container xs={2} justify="flex-end" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >Username</Grid>
								<Grid item xs={8}>
									<TextField disabled value={self.state.userProfile.username} id="outlined-basic" variant="outlined" fullWidth />
								</Grid>
							</Grid>
							<Grid
								style={{marginTop: "25px"}}
								container
								direction="row"
							>
								<Grid item container xs={2} justify="flex-end" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >First Name</Grid>
								<Grid item xs={8}>
									<TextField value={self.state.userProfile.firstName} onChange={self.handleChangeFirstName} id="outlined-basic" variant="outlined" fullWidth />
								</Grid>
							</Grid>
							<Grid
								style={{marginTop: "25px"}}
								container
								direction="row"
							>
								<Grid item container xs={2} justify="flex-end" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >Last Name</Grid>
								<Grid item xs={8}>
									<TextField value={self.state.userProfile.lastName} onChange={self.handleChangeLastName} id="outlined-basic" variant="outlined" fullWidth />
								</Grid>
							</Grid>
							<Grid
								style={{marginTop: "25px"}}
								container
								direction="row"
							>
								<Grid item container xs={2} justify="flex-end" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >Birthday</Grid>
								<Grid item xs={8}>
									<TextField
										id="date"
										type="date"
										value={self.state.userProfile.birthday}
										onChange={self.handleChangeBirthday}
										InputLabelProps={{
										shrink: true,
										}}
									/>
								</Grid>
							</Grid>
							<Grid
								style={{marginTop: "25px"}}
								container
								direction="row"
							>
								<Grid item container xs={2} justify="flex-end" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >Email</Grid>
								<Grid item xs={8}>
									<TextField value={self.state.userProfile.email} onChange={self.handleChangeEmail} id="outlined-basic" variant="outlined" fullWidth />
								</Grid>
							</Grid>
							<Grid
								style={{marginTop: "25px"}}
								container
								direction="row"
							>
								<Grid item container xs={2} justify="flex-end" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >Phone</Grid>
								<Grid item xs={8}>
									<TextField onchange={()=>{}} value={self.state.userProfile.phone} onChange={self.handleChangePhone} id="outlined-basic" variant="outlined" fullWidth />
								</Grid>
							</Grid>
							<Grid
								style={{marginTop: "25px"}}
								container
								direction="row"
							>
								<Grid item container xs={2} justify="flex-end" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >Address</Grid>
								<Grid item xs={8}>
									<TextField value={self.state.userProfile.address} onChange={self.handleChangeAddress} id="outlined-basic" variant="outlined" fullWidth />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</div>
				<div style={{marginTop: "70px"}}>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
					>
						<Button size="large" variant="contained" color="secondary" style={{marginRight: "30px", marginLeft: "-15px"}}>
							Cancel 
						</Button>
						<Button size="large" variant="contained" color="primary" onClick={self.editProfile}>
							Upload Profile 
						</Button>
					</Grid>
				</div>
				{/* <hr></hr>
				<ChangePassword></ChangePassword> */}
			</Container>
		);
	}
}

export default ProfileEdit;
