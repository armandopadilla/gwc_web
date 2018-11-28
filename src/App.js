import React, { Component } from 'react'
import './App.scss'
import OpportunityList from './components/OpportunityList'
import OpportunityMap from './components/OpportunityMap'
import YAML from 'yamljs'
import f from './testdata.yml'
import OpportunityDetails from './components/OpportunityDetails';
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      opportunity: null,
      opportunities: null,
      center: [36.114647, -115.172813]
    }
    this.callbacks = {
      setOpportunity: this.setOpportunity.bind(this),
      setCenter: this.setCenter.bind(this)
    }
    this.opportunityListUrl = null
  }

  componentDidMount() {
    if (this.opportunityListUrl) {
      fetch(this.opportunityListUrl)
        .then(response => response.json())
        .then(data => this.setState({ opportunities: data }));
    } else {
      axios
        .get('https://deiee83toe.execute-api.us-east-1.amazonaws.com/dev/opportunity/list')
        .then(response => {
          this.setState({opportunities: response.data})
        });
    }
  }

  setCenter(lat, lng) {
    this.setState({center: [lat, lng]})
  }

  setOpportunity(opportunity) {
    if (!opportunity) {
      this.setState({opportunity: null})
    } else {
      this.setState({ opportunity: opportunity})    
    }
  }

  render() {
    if (this.state.opportunity) {
      const center = this.state.opportunity.location ? this.state.opportunity.location : [36.1699, -115.1398]
      return (
        <div>          
          <div className="gwcApp">
            <OpportunityDetails 
              opportunity={this.state.opportunity} 
              callbacks={this.callbacks}
            />
            <OpportunityMap
              className="mapPane"    
              center={center}          
              locations={this.state.opportunities} 
              callbacks={this.callbacks}
            />
          </div>          
        </div>
        
      )
    } else {
      return (
        <div>        
          <div className="gwcApp">
            <OpportunityList 
              opportunities={this.state.opportunities} 
              callbacks={this.callbacks}
            />
          </div>
        </div>
      )    
    }
  }
}