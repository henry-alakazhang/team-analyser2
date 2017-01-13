import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './builder.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>
          .rtml Team Analyser
        </h1>
        <h2>
          A Pokemon Team Building and Analysis Tool
        </h2>
        <div className="row">
          <center>
            <h3>
              1. Build Team
            </h3>
          </center>
        </div>
        <div className="row team">
          <Pokemon num="1"/>
          <Pokemon num="2"/>
          <Pokemon num="3"/>
          <Pokemon num="4"/>
          <Pokemon num="5"/>
          <Pokemon num="6"/>
        </div>
        <div className="row">
          <hr/>
          <center>
            <h3>
              2. Analyse
            </h3>
          </center>
        </div>
        <div className="row">
          <ul className="nav nav-tabs" role="tablist">
            <li role="presentation" className="active"><a href="#defense" aria-controls="home" role="tab" data-toggle="tab">Defense</a></li>
            <li role="presentation"><a href="#offense" aria-controls="profile" role="tab" data-toggle="tab">Offense</a></li>
            <li role="presentation"><a href="#utility" aria-controls="messages" role="tab" data-toggle="tab">Utility</a></li>
          </ul>
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="defense">
            </div>
            <div role="tabpanel" className="tab-pane" id="offense">
            </div>
            <div role="tabpanel" className="tab-pane" id="utility">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Pokemon extends Component {
  render() {
    return (
      <div className="col-md-2 pokemon" id={"pokemon"+this.props.num}>
        <input className="form-control pokemon-collapser ui-autocomplete-input" id={"pokemon-selector-"+this.props.num} placeholder={"Pokemon #" +this.props.num} />
        <select className="form-control" id="ability-selector-0" disabled="disabled" />
        <br />
        <div className="move-container">
          <Move poke={this.props.num} num="1" />
          <Move poke={this.props.num} num="2" />
          <Move poke={this.props.num} num="3" />
          <Move poke={this.props.num} num="4" />
        </div>
      </div>
    )
  }
}

class Move extends Component {
  render() {
    return (
      <input className="move form-control ui-autocomplete-input" placeholder={"Move #" + this.props.num} id={this.props.poke +"-move-"+ this.props.num} />
    )
  }
}


export default App;
