import { Alert, Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';


const Info = props => {
  // console.log("response from modal", props.response);
  const handleClose = () =>{
    props.closeModal();
  }
  return (
    <>
      {/* <Alert show={true} variant="success"> 
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert> */}

      {/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}

      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button id="modal_button" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Info;