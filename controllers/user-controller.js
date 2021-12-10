module.exports = (app, dynamoDB) => {
    const UsersService = require("../services/users-service")

    const register = (req, res) => {
        let credentials = req.body

        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let role = req.body.role;
        let birthday = req.body.birthday;

        UsersService.findUserByUsername(username)
            .then(actualUser => {
                if(actualUser.length > 0) {
                    res.send("0")
                } else {
                    UsersService.createUser(credentials)
                        .then(user => {
                            req.session['profile'] = user
                            res.send(user)
                        })
                }
            })
    }

    const profile = (req, res) => {
        const currUser = req.session['profile'];
        res.send(currUser);
    }

    const login = (req, res) => {
        let credentials = req.body
        let username = req.body.username;
        let password = req.body.password;

        UsersService.findUserByUsername(username)
            .then(actualUser => {
                if (Object.keys(actualUser).length > 0) {
                    UsersService.findUserByCredentials(credentials)
                        .then(user => {
                            if (user) {
                                req.session['profile'] = user
                                res.send(user)
                            } else {
                                res.send("User exists, but wrong password");
                            }
                        })
                } else {
                    res.send("User not exists");
                }
            })
    }

    const logout = (req, res) => {
        req.session.destroy(() => {
            res.clearCookie('profile');
            console.log("logout successfully")
            res.redirect('/')
        });
    }

    const updateProfile = (req, res) => {
        let profile = req.body
        let username = profile.username;
        let email = profile.email
        let gender = profile.gender
        let area = profile.area
        let bio = profile.bio
        let flavor = profile.flavor
        let portrait = profile.portrait

        UsersService.updateProfile(username, {email, gender, area, bio, flavor, portrait})
            .then(currProfile => {
                console.log(currProfile)
                res.send(currProfile)
            })
    }

    const findAllUsers = (req, res) => {
        UsersService.findAllUsers()
        .then((users) => {
            res.send(users)
        })
    }

    const findUserByName = (req, res) => {
        const username = req.params['username']
        UsersService.findUserByUsername(username)
        .then((user) => {
            res.send(user)
        })
    }

    app.post('/api/users/register', register)
    app.post('/api/users/profile', profile)
    app.post('/api/users/login', login)
    app.get('/api/users/logout', logout)
    app.post('/api/users/editprofile', updateProfile)
    app.get('/api/users', findAllUsers)
    app.get('/api/users/:username', findUserByName)
}