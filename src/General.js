/*
 * General-use React Components
 */
import React from 'react';
import { ControlLabel, FormGroup, Col } from 'react-bootstrap';

function HorizontalInputComponent(props) {
  return(
    <FormGroup bsSize="sm">
      <Col componentClass={ControlLabel} sm={props.ratio}>
        {props.label}
      </Col>
      <Col sm={12-props.ratio}>
        {props.input}
      </Col>
    </FormGroup>
  )
}

export default HorizontalInputComponent
