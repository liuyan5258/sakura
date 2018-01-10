import mongoose, { Schema } from 'mongoose'

/**
 * 分类模型
 * @param {Array} data
 * */

const ClassifySchema = new Schema({
  id: {
    type: Number,
    default: 0
  },
  name: String,
  childList: {
    type: Array,
    default: []
  },
  articleList: Array
})

export default mongoose.model('Classify', ClassifySchema)
