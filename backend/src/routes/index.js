// const apiRouter = require('./api')
const authRouter = require('./auth')
const userRouter = require('./users')
const timetableRouter = require('./timetable')


const addRouting = (app) => {
    app.get('/test', (_req, res) => {
        res.status(200).send("OVER")
    })
    
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/api/timetable', timetableRouter)
    // app.use('/api', apiRouter)

    // if (process.env.NODE_ENV === 'development') {
    //     app.get('/', (_req, res) => {
    //         let text = ''
    //         text 
    //         res.status(200).send(app._router.stack)
    //     })
    // }
}

module.exports = addRouting