if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

import { Request, Response } from "express";
import { logger } from "./logger";
import { serverError } from "./errors";
import fs from "fs-extra";
import Mustache from "mustache";
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
import { v4 as uuidv4 } from 'uuid';
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(logger);
  app.use(serverError);
  app.use(methodOverride('_method'))
  app.use(express.static("public"))
const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const ePassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            password: ePassword
        })
        res.redirect('/login')
    } catch (error) {
        res.redirect('/register')
    }
    console.log(users)
})

app.delete('/logout', (req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/login');
    });
  });

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.get('*', function (req, res) {
    fs.readFile("./views/404.ejs", "utf-8").then((data) => {
        res.status(404).send(data);
      });
});

app.listen(3000)
