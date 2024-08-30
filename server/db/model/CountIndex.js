const mongoose = require('mongoose');
const Schema = mongoose.Schema

// 自增id 表: 维护不同表的自增id
const counterSchema = new Schema({
    _id: {type: String, required: true},
    sequence_value: {type: Number, default: 1}
})
// 获取自增id下一个id值
counterSchema.statics.getNextSequenceValue = async function (sequenceName) {
    const sequenceDocument = await this.findOneAndUpdate(
      { _id: sequenceName},
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    return sequenceDocument.sequence_value;
};
const CounterModel = mongoose.model('Counter', counterSchema)

module.exports = CounterModel