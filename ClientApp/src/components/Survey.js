import React, { useState, Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class Survey extends Component {
    static displayName = Survey.name;
    
  constructor(props) {
      super(props);
      this.state = { suveys: [], loading: true, id: 0, name: "" };
      this.handleChange = this.handleChange.bind(this);
      this.saveSurvey = this.saveSurvey.bind(this);
  }

  componentDidMount() {
      this.populateSurveysData();
      this.GetSurveyId();
    }

    static renderSurveysTable(surveys) {
        if (surveys.length == 0) {
            return (<div></div>);
        } else {
            return (
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Survey Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map(survey =>
                            <tr key={survey.id}>
                                <td>{survey.id}</td>
                                <td>{survey.surveyName}</td>
                                <td><button className="btn btn-warning" onClick={this.incrementCounter}>Edit(Yet to Implement)</button>&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-danger" onClick={this.incrementCounter}>Delete (Yet to implement)</button>
                                </td></tr>
                        )}
                    </tbody>
                </table>
            );
        }
}

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Survey.renderSurveysTable(this.state.surveys);

        return (
            <div>
                <h1 id="tabelLabel" >Create a Survey</h1>
                <form onSubmit={this.saveSurvey}>
                          <FormGroup>
                              <Label for="surveyId">Id:</Label>
                            <Input type="text" name="text" id="surveyId" value={this.state.id} disabled />
                          </FormGroup>
                          <FormGroup>
                            <Label for="surveyName">Name:</Label>
                            <Input type="text" name="surveyName" id="surveyName" required value={this.state.value} onChange={this.handleChange} />
                        </FormGroup>
                        <p>
                        <input type="submit" className="btn btn-primary" value="Save" />

                        </p>

                </form>
                {contents}
            </div>
        );

  }

    async saveSurvey() {
        let survey = {
            Id: this.state.id,
            SurveyName: this.state.name
        }
        await fetch('survey/saveSurvey', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(survey)
        })
        .then(response => response.json())
        .then(data => {

        });
    }

    async GetSurveyId() {
        const response = await fetch('survey/getSurveyId');
        const data = await response.json();
        this.setState({ id : data });
    }

    async populateSurveysData() {
        const response = await fetch('survey/getAllSurveys');
        const data = await response.json();
        this.setState({ surveys: data, loading: false });
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }
}
