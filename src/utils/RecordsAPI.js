import axios from 'axios'

const api = process.env.REACT_APP_RECORDS_URL || 'http://localhost:5000'
export const getRecords = () => axios.get(`${api}`)
export const createRecord = (body) => axios.post(`${api}`, body)
export const updateRecord = (id, body) => axios.put(`${api}/${id}`,body)
export const delRecord = (id) => axios.delete(`${api}/${id}`)
