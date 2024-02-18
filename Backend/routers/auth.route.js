const express = require('express');

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200)
    res.send({
        message: 'Auth router is working.'
    })
})


module.exports = router;