import UserModel from '../db/schema/user'
import ArticleModel from '../db/schema/article'
import ClassifyModel from '../db/schema/classify'
import jwt from 'jsonwebtoken'
import moment from 'moment'

function getQueryString(obj, name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = obj.search.substr(1).match(reg)
  return r !== null ? decodeURIComponent(r[2]) : null
}

export default function (Router) {
  const router = new Router({
    prefix: '/antd-blog'
  })

  // 注册
  router.post(
    '/signup',
    async (ctx, next) => {
      const { username, password } = ctx.request.body
      const user = await UserModel.findOne({ username }).exec()
      if (user) {
        ctx.body = { status: 0, msg: '用户已存在' }
      } else {
        console.log({ username, password })
        await UserModel({ username, password }).save()
        ctx.body = { status: 1, msg: '注册成功' }
      }
    }
  )

  // 登陆
  router.post(
    '/login',
    async (ctx, next) => {
      const { username, password } = ctx.request.body
      const user = await UserModel.findOne({ username }).exec()
      if (!user) {
        ctx.body = { status: 0, msg: '用户不存在' }
      } else {
        if (user.password !== password) {
          ctx.body = { status: 0, msg: '密码不正确' }
        } else {
          const token = jwt.sign({name: user.username}, 'secret', {
            expiresIn: 60 * 60 // token到期时间设置
          })
          user.token = token
          await user.save()
          ctx.body = { status: 1, msg: '登陆验证成功', token, username }
        }
      }
    }
  )

  // token 验证
  router.post(
    '/valid',
    async(ctx, next) => {
      const { token } = ctx.request.body
      try {
        const decoded = jwt.verify(token, 'secret')
        // 过期
        if (decoded.exp <= Date.now() / 1000) {
          ctx.body = {
            status: 0,
            msg: '登录状态已过期，请重新登录'
          }
          return
        }
        if (decoded) {
          // token is ok
          ctx.body = {
            status: 1,
            msg: '登陆验证成功'
          }
          return
        }
      } catch (e) {
        if (e) {
          ctx.body = {
            status: 0,
            msg: e.message
          }
        }
      }
    }
  )

  // 发布文章
  router.post(
    '/post',
    async (ctx, next) => {
      const { _id, title, content, firstClassify, secondClassify, token } = ctx.request.body
      try {
        const decoded = jwt.verify(token, 'secret')
        const now = new Date()
        const createTime = moment(now).format('YYYY-MM-DD HH:mm')
        // 不是admin，没有发文章的权限
        if (decoded.name === 'liuyan') {
          try {
            const article = await ArticleModel.findOne({ _id }).exec()
            const exitArticle = await ArticleModel.findOne({ title }).exec()
            if (exitArticle) {
              ctx.body = { status: 1, msg: title + '该文章已经存在！' }
              return
            }
            if (article) {
              article.title = title
              article.content = content
              article.firstClassify = firstClassify
              article.secondClassify = secondClassify
              await article.save()
              ctx.body = {
                status: 1,
                msg: '更新成功'
              }
            } else {
              await ArticleModel({ createTime, title, content, firstClassify, secondClassify }).save()
              ctx.body = { status: 1, msg: '成功发布' }
            }
          } catch (e) {
            await ArticleModel({ createTime, title, content, firstClassify, secondClassify }).save()
            ctx.body = { status: 1, msg: '成功发布' }
          }

          const classify = firstClassify
          classify.childList = [secondClassify]
          if (secondClassify.id) {
            secondClassify.articleList = [{ title }]
          } else {
            classify.articleList = [{ title }]
          }
          await ClassifyModel(classify).save()
        } else {
          ctx.body = { status: 0, msg: '你没有该权限' }
        }
      } catch (e) {
        ctx.body = { status: 0, msg: e.message }
      }
    }
  )

  // 获取分类
  router.get(
    '/getClassifyList',
    async (ctx, next) => {
      try {
        const classify = await ClassifyModel.find().exec()
        if (!classify) {
          ctx.body = { status: 0, msg: '暂时没有分类！' }
        } else {
          let data = classify.map(item => item.toJSON())
          // 数组去重
          const uniqueReduce = function (array) {
            return array.reduce((ret, cur) => {
              if (!ret.some(item => item.id === cur.id)) {
                ret.push(cur)
              } else {
                ret.forEach(item => {
                  if (item.id === cur.id) {
                    if (item.childList) {
                      item.childList = item.childList.concat(cur.childList).filter(item => item !== null)
                    }
                    item.articleList = item.articleList.concat(cur.articleList)
                  }
                })
              }
              return ret
            }, [])
          }
          data = uniqueReduce(data)
          data.forEach(item => {
            if (item.childList[0] !== null) {
              item.childList = uniqueReduce(item.childList)
            }
          })
          ctx.body = { status: 1, msg: null, data }
        }
      } catch (error) {
        ctx.body = { status: 0, msg: error.message }
      }
    }
  )

  // 根据文章title获取文章详情
  router.get(
    '/getArticle',
    async (ctx, next) => {
      const title = getQueryString(ctx, 'title')
      try {
        const article = await ArticleModel.findOne({ title }).exec()
        if (article) {
          ctx.body = { status: 1, msg: null, data: article.toJSON().content }
        } else {
          ctx.body = { status: 0, msg: '该文章不存在或已删除！' }
        }
      } catch (e) {
        ctx.body = { status: 0, msg: e.message }
      }
    }
  )

  return router.routes()
}
