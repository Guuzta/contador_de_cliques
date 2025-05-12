const router = require('express').Router()

//pagina de login
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Login'
    })
})

//pagina de registro
router.get('/register', (req,res) => {
    res.render('register' ,{
        title: 'Cadastrar'
    })
})

module.exports = router