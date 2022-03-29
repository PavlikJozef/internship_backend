import { Request, Response } from 'express'
import v1 from './api/v1'

const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send("I am in app.ts")
})

app.use('/api/v1', v1())

export default app