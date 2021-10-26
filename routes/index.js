const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Lesson = require('../models/Lesson');

const story = require('../models/Lesson');

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    });
})

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const lessons = await Lesson.find({ user: req.user.id }).lean()

        res.render('dashboard', {
            name: req.user.firstName,
            lessons
        });
    } catch(err) {
        console.error(err);
        res.render('error/500');
    }
})



module.exports = router;