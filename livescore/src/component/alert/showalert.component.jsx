import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';


const ShowAlert = props => {
  // console.log("response from modal", props.response);
  const [show, setShow] = useState(true);

  const closeAlert = () => {
    props.closeAlert()
  }

  return (
    <div>{
      props.show ?
        <Alert variant={props.variant} onClose={() => closeAlert()} dismissible>
          <Alert.Heading>{props.heading}</Alert.Heading>
          <p style={{fontSize:'14px'}}>{props.message}</p>
        </Alert>
        :
        ""
    }
    </div>
  )
}

export default ShowAlert;