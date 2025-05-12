const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Login'
    })
})

app.get('/register', (req,res) => {
    res.render('register' ,{
        title: 'Cadastrar'
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Servidor rodando na porta ${port}...`))