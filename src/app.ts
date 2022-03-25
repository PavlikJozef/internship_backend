import expres from 'express'
import v1 from './api/v1'

const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('./app/v1', v1())

export default app