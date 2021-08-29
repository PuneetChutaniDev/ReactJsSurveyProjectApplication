import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Survey } from './components/Survey';
import './custom.css'
import { Question } from './components/Question';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/survey-form' component={Survey} />
            <Route path='/add-questions' component={Question} />
      </Layout>
    );
  }
}
