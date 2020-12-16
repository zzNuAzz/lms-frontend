
import { Button, Grid, IconButton, InputAdornment, OutlinedInput, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React,{Component} from 'react';
import updatePassword from '../../../api/graphql/update-password';
import userLogin from '../../../api/user-login';
import { toast } from 'react-toastify';

class ChangePassword extends Component {
    
    constructor(props){
        super(props);
        this.state= {
            showCurrentPassword: false,
            showNewPassword: false,
            showConfirmPassword: false,
            isChanged: false,
            currentPassword: '',
            newPassword:'',
            confirmPassword:'',
            error:'',
        }
    }

    handleChangeCurrentPassword = (event) =>{
        this.setState({
            isChanged: true,
            currentPassword: event.target.value
        })
    };

    handleChangeNewPassword = (event) =>{
        this.setState({
            isChanged: true,
            newPassword: event.target.value
        })
    };

    handleChangeConfirmPassword = (event) =>{
        this.setState({
            isChanged: true,
            confirmPassword: event.target.value
        })
    };

    handleClickShowCurrentPassword = () => {   
        this.setState({
            showCurrentPassword: !this.state.showCurrentPassword,
        })
    };

    handleClickShowNewPassword = () => {   
        this.setState({
            showNewPassword: !this.state.showNewPassword,
        })
    };

    handleClickShowConfirmPassword = () => {   
        this.setState({
            showConfirmPassword: !this.state.showConfirmPassword,
        })
    };
 
    changePassword = async () => {
        if(this.state.newPassword !== this.state.confirmPassword){
            this.setState({
                error: "Wrong confirm password, please try again!"
            })
            return;
        }
        const result = await updatePassword(this.state.currentPassword, this.state.newPassword);
        console.log(result);
        if(result.data.updateUserPassword.success) {
            toast.success('Update successfully!');
        } else {
            toast.error(result.data.updateUserPassword?.message);
        }
    }

    cancel = () =>{
        this.setState({
            currentPassword: '',
            newPassword:'',
            confirmPassword:'',
            isChanged: false,
        })

    }

    render(){
        let self=this;
        return(     
            <div>
                <div style={{fontSize: "150%"}}>Edit Password</div>
                <p>It is better if you set a password with special characters</p>
                <Grid 
                    container 
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        style={{marginTop: "25px"}}
                        item
                        xs={7}
                        container
                        direction="row"
                    >
                        <Grid item container xs={3} justify="flex-start" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >Current Password</Grid>
                        <Grid item xs={7}>
                            <OutlinedInput
                                style={{minWidth: '400px'}}
                                id="outlined-adornment-password"
                                type={self.state.showCurrentPassword ? 'text' : 'password'}
                                value={self.state.currentPassword}
                                onChange={this.handleChangeCurrentPassword}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={self.handleClickShowCurrentPassword}
                                    edge="end"
                                    >
                                    {self.state.showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        style={{marginTop: "25px"}}
                        container
                        item
                        xs={7}
                        direction="row"
                    >
                        <Grid item container xs={3} justify="flex-start" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >New Password</Grid>
                        <Grid item xs={7}>
                            <OutlinedInput
                                style={{minWidth: '400px'}}
                                id="outlined-adornment-password"
                                type={self.state.showNewPassword ? 'text' : 'password'}
                                value={self.state.newPassword}
                                onChange={this.handleChangeNewPassword}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={self.handleClickShowNewPassword}
                                    edge="end"
                                    >
                                    {self.state.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        style={{marginTop: "25px"}}
                        container
                        item
                        xs={7}
                        direction="row"
                    >
                        <Grid item container xs={3} justify="flex-start" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >Confirm Password</Grid>
                        <Grid item xs={7}>
                            <OutlinedInput
                                style={{minWidth: '400px'}}
                                id="outlined-adornment-password"
                                type={self.state.showConfirmPassword ? 'text' : 'password'}
                                value={self.state.confirmPassword}
                                onChange={this.handleChangeConfirmPassword}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={self.handleClickShowConfirmPassword}
                                    edge="end"
                                    >
                                    {self.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid style={{marginTop: '40px'}} container direction="row" justify="center" alignItems="center">
					<Button size="large" variant="contained" color="secondary" disabled={!self.state.isChanged} onClick={self.cancel} style={{marginRight: "30px", marginLeft: "-15px"}} >
						Cancel 
					</Button>
					<Button size="large" disabled={!self.state.isChanged} onClick={self.changePassword} variant="contained" color="primary" >
						Change Password 
					</Button>
				</Grid>
            </div>
        )
    }
}

export default ChangePassword;