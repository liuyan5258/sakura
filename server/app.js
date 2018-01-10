import Koa from 'koa'
import Router from 'koa-router'
import parser from 'koa-bodyparser'
import cors from 'koa2-cors'
import api from './routes/api'
import routes from './routes/index'
import mongoConnection from './db/connection'

const app = new Koa()

app
  .use(cors())
  .use(parser())
  .use(api(Router))
  .use(routes(Router));

(async () => {
  try {
    await mongoConnection()
  } catch (e) {
    console.error('ERROR:', e)
    return
  }
  app.listen(27017, '127.0.0.1', () => {
    console.log('127.0.0.1: 27017 server listen')
  })
})()
