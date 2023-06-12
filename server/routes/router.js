const express = require('express');

const router = express.Router();

router.post('/create', (req, res) => {
    console.log(req.body);
})

module.exports = router;