import { Grid, TextField } from '@material-ui/core';
import React, { Fragment } from 'react';


function TextInput(props) {
  const {name, value, onChange, label, fullWidth, variant, ...rest} = props;
  return (
    <Grid style={{marginTop: "25px"}} container direction="row">
      <Grid item container xs={2} justify="flex-end" alignItems="center" style={{paddingRight: "1rem",fontWeight: "bold" }} >{label}</Grid>
      <Grid item xs={8}>
        <TextField 
          name={name ? name : ""}
          value={value ? value : ""}
          onChange={onChange ? onChange : null}
          variant={variant === undefined ?  "outlined" : variant} 
          fullWidth={fullWidth === undefined ? true : fullWidth} 
          {...rest}
        />
      </Grid>
    </Grid>
  )
}

export default function ProfileEditForm({userProfile, setUserProfile}) {
  const {username, firstName, lastName, birthday, email, phone, address} = userProfile;

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setUserProfile({[name]: value, isChanged: true});
  }

  return (
    <Fragment>
      <TextInput label="Username" name="username" value={username} disabled/>
      <TextInput label="First Name" name="firstName" value={firstName} onChange={handleInputChange}/>
      <TextInput label="Last Name" name="lastName" value={lastName} onChange={handleInputChange}/>
      <TextInput label="Birthday" name="birthday" value={birthday} type="date" format="dd/MM/yyyy" onChange={handleInputChange}/>
      <TextInput label="Email "name="email" value={email} onChange={handleInputChange}/>
      <TextInput label="Phone" name="phone" type="number" value={phone} onChange={handleInputChange}/>
      <TextInput label="Address" name="address" value={address} onChange={handleInputChange}/>
    </Fragment>
  );
}

