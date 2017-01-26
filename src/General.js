/*
 * Components used in multiple places
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

function TeamTableHead(props) {
  return (
    <thead id="typetable-head">
      <tr>
        <th style={{width:"10%"}} />
        {props.team.map((poke, index) =>
          (props.condition(poke)) ?
            <th className="text-center" key={index} style={{width: 90/props.teamsize+"%"}}>
              {poke.species.species}
            </th>
          : null
        )}
      </tr>
    </thead>
  )
}

export { HorizontalInputComponent, TeamTableHead }
