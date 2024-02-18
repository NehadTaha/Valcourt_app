const express = require('express');

const router = express.Router()


// Health check
router.get('/', (req, res) => {
    res.status(200)
    res.send({
        message: 'Auth router is working.'
    })
})

function verify(user) {

}

// Login route
router.post('/login', async(req, res) => {
    const body = req.body;
    console.log('body: ', body);

    const defPass = '1234'
    const defMail = 'his@mail.com'

    if (!body.email || !body.password) {
        res.status(400).send({
            message: 'Missing credentials. Access denied.'
        })

        return
    }

    const user = {
        email: defMail,
        password: defPass
    }

    if (body.email !== user.email || 
        body.password !== user.password) {
            res.status(401).send({
                message: 'Invalid email or password.'
            })

            return
        }

    res.status(200).send({
        message: 'Success'
    })

})

module.exports = router;