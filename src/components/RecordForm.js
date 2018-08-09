import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

import * as RecordsAPI from '../utils/RecordsAPI'

export default class RecordForm extends Component {
    constructor () {
        super()
        this.state = {
            time: '',
            income: '',
            source: ''
        }
    }
    componentDidMount() {
    }
    valid() {
        return this.state.time && this.state.income && this.state.source
    }
    onChangeHandler(e) {
        let name,obj
        name = e.target.name
        this.setState((
            obj = {},
            obj["" + name] = e.target.value,
            obj
        ))
    }
    submitHandler() {
        RecordsAPI.createRecord(this.state).then(
            response => this.props.getData(this.state)
        ).catch(
            error => console.log(error.message)
        )
    }
    render() {
        return (
            <Form onSubmit={this.submitHandler.bind(this)}>
                <Form.Group widths='equal'>
                    <Form.Field control={Input} name='time' value={this.state.time} placeholder='时间' onChange={this.onChangeHandler.bind(this)} />
                    <Form.Field control={Input} name='income' value={this.state.income} placeholder='收入' onChange={this.onChangeHandler.bind(this)} />
                    <Form.Field control={Input} name='source' value={this.state.source} placeholder='来源' onChange={this.onChangeHandler.bind(this)} />
                    <Form.Field control={Button} disabled={!this.valid()}>Submit</Form.Field>
                </Form.Group>
            </Form>
        )
    }
}
