import { Grid, TextField } from "@material-ui/core";

import {React,Component} from 'react';

class ChangePassword extends Component {
    render(){
        return(
            <div>
                <div style={{fontSize: "150%"}}>Edit Password</div>
                <Grid container>
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
                            <Grid item container xs={2} justify="flex-end" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >Current Password</Grid>
                            <Grid item xs={8}>
                                <TextField value={this.state.userProfile.firstName} onChange={this.handleChangeFirstName} id="outlined-basic" variant="outlined" fullWidth />
                            </Grid>
                        </Grid>
                        <Grid
                            style={{marginTop: "25px"}}
                            container
                            direction="row"
                        >
                            <Grid item container xs={2} justify="flex-end" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >Last Name</Grid>
                            <Grid item xs={8}>
                                <TextField value={this.state.userProfile.lastName} onChange={this.handleChangeLastName} id="outlined-basic" variant="outlined" fullWidth />
                            </Grid>
                        </Grid>
                        <Grid
                            style={{marginTop: "25px"}}
                            container
                            direction="row"
                        >
                            <Grid item container xs={2} justify="flex-end" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >Last Name</Grid>
                            <Grid item xs={8}>
                                <TextField value={this.state.userProfile.lastName} onChange={this.handleChangeLastName} id="outlined-basic" variant="outlined" fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ChangePassword;