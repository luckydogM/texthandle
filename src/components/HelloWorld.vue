<template>
  <div class="hello">
    <p style="text-align:left">源数据</p>
    <el-input type="textarea" v-model="text"></el-input>
    <div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pages"
        :page-size="1"
        @current-change="changePage"
        :current-page="page"
      >
      </el-pagination>
    </div>

    <div class="fl">
      <el-tree :data="dir" :props="defaultProps" default-expand-all :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="fr" v-html="manualInfo" ref="scrollContainer">
    </div>

  </div>
</template>

<script>
import util from './common/util.js'
export default {
  name: 'HelloWorld',
  data() {
    return {
      page:1,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      ref: null,
      text: '<h1>h1标题</h1><h2>h2标题</h2><p>helloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworld</p><h3>h3标题</h3><p>121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213121322131213221312132213</p><h2>h2标题222</h2><p>11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</p><h1>h1标题第二段</h1><h3>第二个h2标题</h3><h4>h3标题</h4><h5>h5标题</h5>'
    }
  },
  computed: {
    pages() {
      return this.manual.length
    },
    manualInfo() {
      return this.manual[this.page-1]
    },
    obj() {
      return util.textHandle.getTextInfo(this.text)
    },
    manual() {
      return this.obj.manual
    },
    dir() {
      return this.obj.dir
    }
  },
  watch: {
    ref(target) {
      setTimeout(()=>{
        var container = this.$refs.scrollContainer
        var element = container.querySelector('[ref='+ target + ']')
        if (element) {
          var offset = element.offsetTop
          container.scrollTop = offset - container.offsetTop
        }
      },100)
    }
  },
  methods: {
    changePage(val) {
      console.log(val);
      this.page = val
    },
    handleNodeClick(data) {
      this.page = data.page * 1
      this.ref = data.ref
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.fl {
  float: left;
  width: 20%;
  border: 1px solid #ddd;
  overflow: hidden;
}
.fr {
  float: right ;
  width: 76%;
  text-align: left;
  border: 1px solid #ddd;
  padding: 0 20px;
  height: 300px;
  overflow: auto;
  word-break: break-all;
}
p {
  line-height: 2;
}
</style>
