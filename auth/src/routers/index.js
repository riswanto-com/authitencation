module.exports = (app) => {
    app.get('/', (req, res) => {
        res.status(200).json('Welcome to the Microservice v2')
    })
    app.use("/api", require('./AuthRoute'))

}