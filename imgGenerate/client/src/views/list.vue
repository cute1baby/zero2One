<template>
  <ul class="wrapList df dfjbw dfrw">
      <li v-for="(item,index) in wrapList" :key="index">
          <div class="box" @click="routerPath(item.path)">
              <img :src="imgCover" class="cover" alt="" />
              <div class="art_details df dfjbw dfdir">
                  <span class="title">{{item.name}}</span>
              </div>
          </div>
      </li>
  </ul>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      imgCover: require('@/assets/img/resource.jpg'),
      wrapList: [
        {
          id: 1,
          name: '批量操作荣誉证书',
          path: 'certificate'
        }
      ]
    }
  },
  methods: {
    routerPath (path, query) {
      this.$router.push({path, query})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.wrapList{
    width: 100%;
    li{
        width: 25%;
        padding: 0 12px 24px;
        box-sizing: border-box;
        .box{
            cursor: pointer;
            background: #fff;
            transition: all .3s ease-in-out;
            &:hover{
                transform: translate(1px,1px);
                color: #50a1ff;
                box-shadow: 0 0 8px rgb(0 0 0 / 20%);
            }
            .cover{
                width: 100%;
                display: block;
            }
            .art_details{
                padding: 12px 14px 20px;
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
}
</style>
