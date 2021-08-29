import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
            <h1>This is a Survey Form</h1>
            <p>
                <ol>
                    <li> Create a survey </li>
                    <li> Add questions to a survey </li>
                    <ul><li> Each question can have 1-4 answers </li>
                    <li> A survey must have at least one question </li>
                    <li> A survey can have a maximum of 4 questions </li></ul>
                    <li> Show a list of all surveys that have been created </li>
                    <li> Edit an existing survey </li>
                    <li> Remove a survey </li>
                </ol>
            </p>
      </div>
    );
  }
}
