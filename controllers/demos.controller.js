module.exports = (app) => {

    const hello = (req, res) => {
        res.send('Hello World 111')
    }

    app.get('/', hello)
}