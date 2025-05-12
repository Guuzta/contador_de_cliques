const express = require('express')
const path = require('path')

const routes = require('./routes')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Servidor rodando na porta ${port}...`))