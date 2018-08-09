import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import * as RecordsAPI from '../utils/RecordsAPI'

import Record from './Record';
import RecordForm from './RecordForm';

export default class Records extends Component {
    constructor () {
        super()
        this.state = {
            isLoaded: false,
            recordsList: [],
            error: null
        }
    }

    componentDidMount () {
        RecordsAPI.getRecords().then(
            response => this.setState({
                recordsList: response.data,
                isLoaded: true
            })
        ).catch(
            error => this.setState({
                error,
                isLoaded: true
            })
        )
    }
    getFormData(data) {
        this.setState({
            isLoaded: true,
            recordsList: [...this.state.recordsList, data],
            error: null
        })
    }
    updateFormData(record, newdata) {
        const updateIndex = this.state.recordsList.indexOf(record)
        const newRcords = this.state.recordsList.map( (item, index) => {
            if(index !== updateIndex) {
                // This isn't the item we care about - keep it as-is
                return item;
            }
            // Otherwise, this is the one we want - return an updated value
            return {
                ...item,
                ...newdata
            };
        });
        this.setState({
            recordsList: newRcords
        })
    }
    delRecord(record) {
        const delIndex = this.state.recordsList.indexOf(record)
        const newRecordList =  this.state.recordsList.filter( (record, index) => index !== delIndex);
        this.setState({
            recordsList: newRecordList
        })
    }
    render() {
        const { error, recordsList, isLoaded } = this.state
        let componentContent
        if (error) {
            componentContent = <div>Error: {error.responseText}</div>
        } else if (!isLoaded) {
            componentContent = <div>Loading...</div>
        } else {
            componentContent = <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>时间</Table.HeaderCell>
                        <Table.HeaderCell>收入</Table.HeaderCell>
                        <Table.HeaderCell>来源</Table.HeaderCell>
                        <Table.HeaderCell>操作</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {recordsList.map((record, i) => <Record record={record} key={i} updateData={this.updateFormData.bind(this)} delData={this.delRecord.bind(this)}/>)}
                </Table.Body>
            </Table>
        }

        return (
            <div>
                <h2>收入列表</h2>
                <RecordForm getData={this.getFormData.bind(this)}/>
                {componentContent}
            </div>
        )
    }
}
