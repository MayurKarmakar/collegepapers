import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import {BrowserRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionTypes from './store/actions/auth'


import './App.css'
import ScrollToTop from './hoc/ScrollToTop/ScrollToTop';


class App extends Component {

  componentDidMount = () => {
    if(localStorage.getItem('key') !== null){
      this.props.autoCheckAuth(localStorage.getItem('key'))
    }
  }
  
  
  render() {
  
    return (
      <div>
        <BrowserRouter>
          {/* <Header/> */}
          <ScrollToTop>
            <Layout/>
          </ScrollToTop>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoCheckAuth : (key) => dispatch(actionTypes.getUserDetails(key)) 
  }
}


export default connect(null,mapDispatchToProps)(App);
