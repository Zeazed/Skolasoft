import { builtinModules } from "module"
import { nextTick } from "process"

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport:any, getUserByEmail:any, getUserById:any) {
    const authenticateUser = async (email:any, password:any, done:any) => {
        const user = getUserByEmail(email)
        if(user == null){
            return done(null, false, { message: ' Ingen användare '})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message : ' Fel Lösenord '})
            }
        } catch (e) {
            return done(e)
            
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user: { id: any }, done: (arg0: null, arg1: any) => any) => done(null, user.id))
    passport.deserializeUser((id: any, done: (arg0: null, arg1: any) => any) => {
       return done(null, getUserById(id))
    })
}

module.exports = initialize