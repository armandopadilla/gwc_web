import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderToString } from 'react-dom/server'
import TableFilter from 'react-table-filter'

export default class OpportunityList extends Component {

    static propTypes = {
        opportunities: PropTypes.array,
        callbacks: PropTypes.object.isRequired
    }
  
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }

    _filterUpdated(newData){
		this.setState({
			data: newData
		});
    }
    
    _loadData() {
        if (this.state.data == null) {
            const data = this.props.opportunities.map((opportunity, i) => {
                console.log(opportunity.timeCommitment)
                return {
                    name: opportunity.label,
                    time: opportunity.timeCommitment,
                    steps: JSON.stringify(opportunity.steps)
                }
            })
            this.setState({data})       
            return data
        } else {
            return this.state.data
        }
    }

    render() {
        if (this.props.opportunities) {
            const data = this._loadData()
            return (
                <table>
                    <thead>
                    <TableFilter 
                        rows={data} >
                        <th filterkey="name">
                        Name
                        </th>
                        <th filterkey="time">
                        Time
                        </th>
                        <th filterkey="steps">
                        Steps
                        </th>
                    </TableFilter>
                    </thead>
                    <tbody>
                        {
                            this.props.opportunities.map((opportunity, i) => {
                                return (<tr key={`opportunity-${i}`} onClick={() => { 
                                    this.props.callbacks.setOpportunity(opportunity)
                                }}>
                                    <td>{opportunity.label}</td>
                                    <td><span>{opportunity.time_commitment}</span></td>
                                    <td>
                                        <ul>
                                        {
                                            opportunity.steps.map((step, i) => (
                                                <li key={`opportunity_step-${i}`}><span>{step.label}</span> {step.description}</li>
                                            ))
                                        }
                                        </ul>
                                    </td>
            
                                </tr>)  
                            })
                        }
                    </tbody>
                </table>
            )
        } else {
            return <div>No data available.</div>
        }
    }
}  