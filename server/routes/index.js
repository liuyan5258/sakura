export default function (Router) {
  const router = new Router()

  /**
   * 首页路由
   * @param  {Function} Router
   * @return {Function}
   */

  router.get('/', async (ctx, next) => {
    ctx.body = 'hello world!'
  })

  return router.routes()
}
