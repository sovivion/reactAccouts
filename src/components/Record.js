import React, { Component } from 'react';
import { Button, Input, Label, Table } from 'semantic-ui-react';
import * as RecordsAPI from '../utils/RecordsAPI'

export default class Records extends Component {
    constructor (props) {
        super(props)
        this.state = {
            edit: false,
            time: this.props.record.time,
            income: this.props.record.income,
            source: this.props.record.source
        }
    }
    handlerToggle() {
        this.setState({
            edit: !this.state.edit
        })
    }
    changeRecord(e) {
        let name,obj
        name = e.target.name
        this.setState((
            obj = {},
            obj["" + name] = e.target.value,
            obj
        ))
    }
    updateRecord() {
        const newrecord = {
            time: this.state.time,
            income: this.state.income,
            source: this.state.source
        }
        RecordsAPI.updateRecord(this.props.record.id, newrecord).then(
            response => {
                if (response.status === 200) {
                    this.setState({
                        edit: !this.state.edit
                    })
                    this.props.updateData(this.props.record, newrecord)
                }
            }
        ).catch(
            error => console.log(error.message)
        )
    }
    delRecord() {
        RecordsAPI.delRecord(this.props.record.id).then(
            response => {
                if (response.status === 200) {
                    this.props.delData(this.props.record)
                }
            }
        ).catch(
            error => console.log(error.message)
        )
    }
    rowNormal(){
        return (
            <Table.Row>
                <Table.Cell>{this.props.record.time}</Table.Cell>
                <Table.Cell>{this.props.record.income}</Table.Cell>
                <Table.Cell negative>{this.props.record.source}</Table.Cell>
                <Table.Cell>
                    <Button basic color='teal' onClick={this.handlerToggle.bind(this)}>Edit</Button>
                    <Button basic color='red' onClick={this.delRecord.bind(this)}>del</Button>
                </Table.Cell>
            </Table.Row>
        )
    }
    rowEdit() {
        return (
            <Table.Row>
                <Table.Cell>
                    <Input name="time" placeholder='time' defaultValue={this.props.record.time} onChange={this.changeRecord.bind(this)}/>
                </Table.Cell>
                <Table.Cell>
                    <Input name="income" labelPosition='right' defaultValue={this.props.record.income} type='text' placeholder='income' onChange={this.changeRecord.bind(this)}>
                        <Label basic>$</Label>
                        <input />
                        <Label>.00</Label>
                    </Input>
                </Table.Cell>
                <Table.Cell>
                    <Input name="source" placeholder='source' defaultValue={this.props.record.source} onChange={this.changeRecord.bind(this)}/>
                </Table.Cell>
                <Table.Cell>
                    <Button basic color='teal' onClick={this.updateRecord.bind(this)}>update</Button>
                    <Button basic color='red' onClick={this.handlerToggle.bind(this)}>cancle</Button>
                </Table.Cell>
            </Table.Row>
        );
    }
    render() {
        if (!this.state.edit) {
            return this.rowNormal()
        } else {
            return this.rowEdit()
        }
    }
}
