import { Avatar, Divider, Grid, List, ListItemAvatar, ListItemText, makeStyles, TextField } from '@material-ui/core';
import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DnsIcon from '@material-ui/icons/Dns';
import CakeIcon from '@material-ui/icons/Cake';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';






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

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
}));

export default function ProfileForm({userProfile, setUserProfile}) {
    const classes = useStyles();
    const {username, firstName, lastName, birthday, email, phone, address} = userProfile;

    const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setUserProfile({[name]: value, isChanged: true});
  }

  return (
    <Fragment>
      {/* <TextInput label="Username" name="username" value={username} InputProps={{readOnly: true}}/>
      <TextInput label="First Name" name="firstName" value={firstName} onChange={handleInputChange} InputProps={{readOnly: true}} />
      <TextInput label="Last Name" name="lastName" value={lastName} onChange={handleInputChange} InputProps={{readOnly: true}}/>
      <TextInput label="Birthday" name="birthday" value={birthday} type="date" format="dd/MM/yyyy" onChange={handleInputChange} InputProps={{readOnly: true}}/>
      <TextInput label="Email "name="email" value={email} onChange={handleInputChange} InputProps={{readOnly: true}}/>
      <TextInput label="Phone" name="phone" value={phone} onChange={handleInputChange} InputProps={{readOnly: true}}/>
      <TextInput label="Address" name="address" value={address} onChange={handleInputChange} InputProps={{readOnly: true}}/> */}
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <AccountBoxIcon/>
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={username} bold/>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <DnsIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={firstName+' '+lastName} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <CakeIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={birthday}/>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <EmailIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email}/>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <PhoneAndroidIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={phone}/>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <HomeIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={address}/>
            </ListItem>
        </List>
    </Fragment>
  );
}

