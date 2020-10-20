import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function NavBarSignin() {
  const [modalVisible, setModalVisible] = useState(true);
  const [user, setUser] = useState({ login: false });

  const showModal = () => {
    setModalVisible(false);
  };
  const hideModal = () => {
    setModalVisible(true);
  };
  return (
    <>
      <Button
        variant="primary"
        className="border-round m-1"
        onClick={showModal}
      >
        Signin
      </Button>
      <Modal show={modalVisible === false} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              {/* <Form.Label>Username</Form.Label> */}
              <Form.Control
                className="border-round"
                type="text"
                placeholder="Enter username"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                className="border-round"
                type="password"
                placeholder="Enter password"
              ></Form.Control>
            </Form.Group>
            <Button className="border-round" block>
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{display:"block"}}>
          <div className="text-center" >or signin with</div>
          <Button variant="info" className="border-round" block>Google</Button>
          <Button variant="info" className="border-round" block>Facebook</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
