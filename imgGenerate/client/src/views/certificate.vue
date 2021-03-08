<template>
  <div class="wrapper df">
      <div class="left">
          <h3 class="t_name">合成示例</h3>
          <img :src="imgCover" class="cover" alt="" />
      </div>
      <div class="right">
          <h3 class="t_name">操作</h3>
            <el-form class="formRight" ref="form" label-width="80px">
              <el-form-item label="学员姓名">
                <el-input v-model="userName" ref="username" placeholder="请输入学员姓名"></el-input>
              </el-form-item>
              <el-form-item label="日期">
                <el-date-picker
                  v-model="learnDate"
                  type="date"
                  format="yyyy年MM月dd日"
                  value-format="yyyy年MM月dd日"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即生成</el-button>
              </el-form-item>
            </el-form>
      </div>
  </div>
</template>

<script>
import {Form, FormItem, Input, Button, DatePicker, Message} from 'element-ui'
import axios from 'axios'
export default {
  data () {
    return {
      imgCover: require('@/assets/img/resource.jpg'),
      userName: '',
      learnDate: ''
    }
  },
  methods: {
    validateForm () {
      const { userName, learnDate } = this
      if (!userName.trim()) {
        this.$refs.username.$el.children[0] && this.$refs.username.$el.children[0].focus()
        Message('请输入学员姓名')
        return false
      }
      if (!learnDate.trim()) {
        Message('请选择训练营时间')
        return false
      }
      return true
    },
    onSubmit () {
      const { userName, learnDate } = this
      if (this.validateForm()) {
        axios({
          url: '/autoPic/beElectricityPoster',
          method: 'post',
          data: {
            userName,
            learnDate
          }
        }).then(res => {
          if (!res.data.code) {
            console.log(11)
          }
        })
      }
    }
  },
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-button': Button,
    'el-date-picker': DatePicker
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.wrapper{
  .t_name{
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 24px;
  }
  .left{
      width: 400px;
      margin-right: 24px;
      .cover{
          width: 100%;
          display: block;
      }
  }
  .right{
    /deep/ .el-date-editor{
      width: 320px;
    }
    /deep/ .el-input__inner{
      width: 320px;
    }
  }
}
</style>
