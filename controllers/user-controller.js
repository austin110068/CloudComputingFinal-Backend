module.exports = (app) => {

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
        const currUser = req.session['profile']
        res.send(currUser)
    }

    const login = (req, res) => {
        let credentials = req.body
        let username = req.body.username;
        let password = req.body.password;

        UsersService.findUserByUsername(username)
            .then(actualUser => {
                //"1" => user exists, but wrong password
                if(actualUser.length > 0) {
                    // res.send("1")
                    UsersService.findUserByCredentials(credentials)
                        .then(user => {
                            if(user) {
                                req.session['profile'] = user
                                res.send(user)
                            } else {
                                res.send("1")
                            }
                        })
                } else {
                    //"0" => user not exists
                    res.send("0")
                }
            })
    }

    const logout = (req, res) => {
        req.session.destroy(() => {
            res.clearCookie('profile');
            console.log("logout successfully")
            res.redirect('/')
        });
        
        // req.user.save();
        // req.logout();
        // res.send("0")
        
        // console.log(req)
        // req.session.destroy(() => {
        //     req.logout()
        //     res.redirect('/')
        // })
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
        // let username = req.params["username"]
        UsersService.updateProfile(username, {email, gender, area, bio, flavor, portrait})
            .then(currProfile => {
                console.log(currProfile)
                res.send(currProfile)
            })
    }

    // const findProfileByUsername = (req, res) => {
    //     // let username = req.params["username"]
    //     UsersService.findProfileByUsername()
    //         .then(profile => res.send(profile))
    // }
//    const findAllFavoritesForAUser = (req, res) => {
//        let username = req.params.username
//        UsersService.findAllFavoritesForAUser(username)
//            .then()
//    }

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

//    app.get('/api/favorites/user/:username', findAllFavoritesForAUser)

    // app.get('/api/users/profile', findProfileByUsername)
}