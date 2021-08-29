import React, { useState, Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class Question extends Component {
    static displayName = Question.name;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            surveyname: "",
            question: "",
            numberofanswers: 1,
            questions: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
    }

    componentDidMount() {
        this.populateQuestionsData();
    }

    static renderQuestionsTable(questions) {
        if (questions.length == 0) {
            return (<div></div>);
        } else {
            return (
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Survey Name</th>
                            <th>Question</th>
                            <th>Total Answers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map(question =>
                            <tr key={question.id}>
                                <td>{question.surveyName}</td>
                                <td>{question.ques}</td>
                                <td>{question.totalAnswers}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            );
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Question.renderQuestionsTable(this.state.questions);

        return (
            <div>
                <h1 id="tabelLabel" >Add Questions</h1>
                <form onSubmit={this.saveQuestion}>
                    <FormGroup>
                        <Label for="surveyname">Survey name:</Label>
                        <Input type="text" name="surveyname" id="surveyname" required value={this.state.surveyName} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="question">Question:</Label>
                        <Input type="text" name="question" id="question" required value={this.state.question} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="numberofanswers">Number of Answers</Label>
                        <Input type="select" name="numberofanswers" id="numberofanswers" value={this.state.numberofanswers} onChange={this.handleChange}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Input>
                    </FormGroup>
                    <p>
                        <input type="submit" className="btn btn-primary" value="Save" />
                    </p>
                    {contents}
                </form>
            </div>
        );
    }

    async saveQuestion() {
        debugger;
        let question = {
            SurveyId: 0,
            SurveyName : this.state.surveyname,
            id: 0,
            Ques: this.state.question,
            TotalAnswers: parseInt(this.state.numberofanswers)
        }
        await fetch('survey/saveQuestion', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(question)
        })
            .then(response => response.json())
            .then(data => {
                if (data == false) {
                    alert("Either survey not found or questions cannot exceed 4")
                }
            });
    }

    async populateQuestionsData() {
        const response = await fetch('survey/getAllQuestions');
        const data = await response.json();
        this.setState({ questions: data, loading: false });
    }

    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
            [evt.target.name]: value
        });
    }
}
