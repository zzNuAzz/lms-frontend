import { Avatar, Divider, Grid, List, ListItemAvatar, ListItemText, makeStyles, TextField } from '@material-ui/core';
import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DnsIcon from '@material-ui/icons/Dns';
import CakeIcon from '@material-ui/icons/Cake';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';


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
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <AccountBoxIcon/>
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Username" secondary={username} bold/>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <DnsIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Name" secondary={firstName+' '+lastName} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <CakeIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Birthday" secondary={birthday ? birthday : "None"}/>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <EmailIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email" secondary={email ? email : "None"}/>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <PhoneAndroidIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Phone" secondary={phone ? phone : "None"}/>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <HomeIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Address" secondary={address ? address : "None"}/>
            </ListItem>
        </List>
    </Fragment>
  );
}

