const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const cors = require('cors')

const routes = require('./routes.js')

mongoose.set('useFindAndModify', false)

/**
 * Server
 * @Class
 */
class Server {
  constructor () {
    this.app = express()
  }

  /**
   * Data base connect
   * @return {Object} connect
   */
  dbConnect () {
    // const host = 'mongodb://localhost:27017/social-networks' #Local connection
    const opts = { useNewUrlParser: true, useUnifiedTopology: true }
    const host = 'mongodb+srv://test:test@cluster0.jw0c4.mongodb.net/thesquareback?retryWrites=true&w=majority' // Atlas connection
    const connect = mongoose.createConnection(host, opts)

    connect.on('error', (err) => {
      setTimeout(() => {
        console.error(`[ERROR] api dbConnect() -> ${err}`)
        this.connect = this.dbConnect(host, opts)
      }, 5000)
    })

    connect.on('disconnected', () => {
      setTimeout(() => {
        console.log('[DISCONNECTED] api dbConnect() -> mongodb disconnected')
        this.connect = this.dbConnect(host, opts)
      }, 5000)
    })

    process.on('SIGINT', () => {
      connect.close(() => {
        console.log('[API END PROCESS] api dbConnect() -> close mongodb connection')
        process.exit(0)
      })
    })

    return connect
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ 'extended': true }))
  }

  /**
   * Routes
   * TODO : 
   * Needed to insert the auth api and token check here
   */
  routes () {
    this.app.use((req, res, next) => {
        next()
    })

    new routes.User(this.app, this.connect)
    new routes.Sport(this.app, this.connect)

    this.app.use((req, res) => {
      res.status(404).json({
        code: 404,
        message: 'not found'
      })
    })
  }

  /**
   * Run
   */
  run () {
    try {
      this.connect = this.dbConnect()
      this.dbConnect()
      this.middleware()
      this.routes()
      this.app.listen(3000)
    } catch (err) {
      console.log(`[ERROR] Server -> ${err}`)
    }
  }
}

module.exports = Server
