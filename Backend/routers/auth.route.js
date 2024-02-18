const express = require('express');
const { client } = require('../database/database');


const router = express.Router()

// Database access
const database = client.db('valcourtApp')
const users = database.collection('users')

// Health check
router.get('/', (req, res) => {
    res.status(200)
    res.send({
        message: 'Auth router is working.'
    })
})

// Login route
router.post('/login', async(req, res) => {
    const body = req.body;
    console.log('body: ', body);

    const defPass = '1234'
    const defMail = 'his@mail.com'

    if (!body.email || !body.password) {
        res.status(401).send({
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

router.post('/register', async(req, res) => {
    const body = req.body;
    console.log('body: ', body);

    if (!body.email || !body.password) {
        res.status(401).send({
            message: 'Missing credentials. Registration failed.'
        })

        return
    }

    try {
        const result = await users.insertOne({
            email: body.email,
            password: body.password
        })

        console.log('result: ', result);
    } catch (error) {
        res.status(500).send({
            error
        })

        console.log(error);

        return
    }

    res.status(201).send({
        message: 'User registered.'
    })
})

module.exports = router;