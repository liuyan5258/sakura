import mongoose, { Schema } from 'mongoose'

/**
 * 文章模型
 * @param {String} title 标题
 * @param {String} content 内容
 * @param {Number} views 被浏览次数
 * @param {String} createUser 创建人
 * @param {Date} createTime 创建日期
 * @param {Object} firstClassify 一级分类
 * @param {Object} secondClassify 二级分类
 * @param {int} status 是否生效
 * */

const ArticleSchema = new Schema({
  title: String,
  content: String,
  views: {
    type: Number,
    default: 0
  },
  createUser: String,
  createTime: {
    type: Date,
    default: new Date()
  },
  firstClassify: {
    type: Object,
    default: {}
  },
  secondClassify: {
    type: Object,
    default: {}
  },
  status: Number
})

export default mongoose.model('Post', ArticleSchema)
