const express = require('express')
const axios = require('axios')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('../client/dist'))
app.use(express.json())

app.get('/qa/questions/:id',(req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${req.params.id}&page=5&count=10`, {
    headers: {
      Authorization: process.env.GITKEY
    }
  })
    .then(result => res.status(200).json(result.data))
})

app.get('/qa/questions/:id/answers',(req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.params.id}/answers?page=5&count=10`, {
    headers: {
      Authorization: process.env.GITKEY
    }
  })
    .then(result => res.status(200).json(result.data))
})

app.listen(PORT)

