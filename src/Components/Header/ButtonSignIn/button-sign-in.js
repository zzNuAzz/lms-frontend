import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AccountCircleRounded } from "@material-ui/icons";
import { Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "500px",
    height: "300px",
    backgroundColor: theme.palette.background.paper,
    // padding: '50px 100px',
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SignInButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <AccountCircleRounded />
        &nbsp; Sign In
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid
              container
              direction="column"
              justify="center"
              alignContent="center"
              spacing={3}
            >
              <Grid item>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  label="Username"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  label="Password"
                />
              </Grid>
              {/* <Button variant="contained" color="primary">
                  Sign in
                </Button>
                <Button variant="contained" color="primary">
                  Sign up
                </Button> */}
              <Row>
                <Col>
                  <Button variant="contained" color="primary">
                    Sign in
                  </Button>
                </Col>
                <Col>
                  <Link to="/signup">
                    <Button variant="contained" color="primary">
                      Sign up
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
