export default {
  textHandle: {
    targetCount: 0, //锚点计数
    myManual: [], // 收集章节信息
    dir: [],//收集目录信息
    count: 0,// 计算嵌套层级 层级为2时就
    getTextInfo (string) {
      string = this.formatString(string)
      var count = this.count
      this.getList(string,null,count)
      this.dir = this.getPage(this.myManual)
      var relationShip = this.getRelationShip(this.dir)
      var arrsData = this.formatData(relationShip)
      this.dir = this.plain2Tree(arrsData)
      var myManual = this.myManual.length === 0 ? [string] : [...this.myManual]
      var dirs = !this.dir || this.dir.length === 0 ? [] : [...this.dir]
      this.myManual = []
      this.dir = []
      this.targetCount = 0
      return {
        dir: dirs,
        manual: myManual
      }
    },
    // 字符串加锚点处理
    formatString(string){
      var self = this
      var strings = string.trim()
      strings = string.replace(/<h.*?(?:>|\/>)/g, function(match) {
        self.targetCount++
        var newStr = match.slice(0,-1) + ' ref="target' + self.targetCount +'">';
        return newStr
      })
      return strings
    },
    // 字符串分页
    getList (str, i, count) {
      i = i ? i : 1;
      if (i > 6) {
        if (coun === 1) {
          this.myManual.push(str)
        }
        return
      }
      var reg = new RegExp("<h"+i+".+?>",'g')
      var reg2 = "</h"+i+">"
      // 如果匹配到最外层标签
      var arr = this.getMatch(str, reg);
      var arr2 = this.getMatch(str, reg2);
      // 如果最外层还没匹配到则继续向下匹配
      if (arr.length == 0) {
        i++;
        this.getList(str, i,count)
      } else {
        // 将字符串分段
        var afterSplite = this.splitStr(str, arr);
        count++;
        //遍历数组继续下一个分段
        afterSplite.map((valueStr, index)=>{
          var reg3 = new RegExp("<h" + (i + 1) +".+?>",'g')
          var arr3 = this.getMatch(str, reg3);
          if (count < 2 && arr3.length > 0) {
            var firstHead = str.slice(0, arr3[0])
            firstHead && this.myManual.indexOf(firstHead) === -1 && this.myManual.push(firstHead)
          }
          this.getList(valueStr, i+1, count)  
        })
        if (count == 2) {
          afterSplite[0] = this.myManual.splice(-1) + afterSplite[0]
          this.myManual = this.myManual.concat(afterSplite)
        }
      }
    },
    // 增加分页标记
    getPage (arr) {
      var result = []
      arr.map((val,index)=>{
        var str = val
        var mStr = ''
        str.replace(/(<h.*?>)(.*?)(<\/h.*?>)/g,function(g, $1, $2, $3){
          mStr += $1.slice(0,-1) + ' page="' + (index+1) +'">' + $2 + $3
        })
        var newArr = mStr.split('<h').map((val)=>{
          if(val){
            return  '<h'+val
          }
        })
        newArr = newArr.filter(function(e){return e}); 
        result.push(...newArr)
      })
      return result
    },
    // 格式化数据专用 
    formatData (arr){
      var data = {};
      for (var i = 0;i < arr.length;i++){
        var val = arr[i];
        data[val.id] = val;
      }
      data[-1] = {parentId: '', name: 'root'};
      return data;
    },
    // 获取目录的数据结构 //获取父子关系表
    getRelationShip (arr) {
      var result = []
      arr.map((str,i)=>{
        var hTag = str[2]
        var parent=-1
        var ref;
        var page;
        if (i != 0) {
          for (var j=i-1;j>=0;j--) {
            if (hTag > arr[j][2]) {
              parent = arr[j][2]+'-'+j
              break
            } else if (j==0) {
              parent = -1
            }
          }
        }
        var match1 = str.match(/page=".+?"/)
        match1 = match1 && match1[0]
        match1 = match1.match(/\d/)
        page = match1 && match1[0]
        
        var match2 = str.match(/ref="target.+?"/)
        match2 = match2 && match2[0]
        match2 = match2.match(/\d/)
        ref = match2 && 'target' + match2[0]

        result.push({
          id: hTag + '-' + i,
          label: str.replace(/<\/?.+?\/?>/g, ''),
          parentId: parent,
          ref,
          page
        })
      })
      return result
    },
    // 父子关系表转为树状结构
    plain2Tree (obj) {
      let key;
      let res = {};
      for (key in obj) {
        let val = obj[key];
        var parent = val.parentId;
        if (parent === '') {
          res = val;
        } else {
          if (!obj[parent].children) {
            obj[parent].children = [];
          }
          obj[parent].children.push(val);
        }
      }
      return res.children;
    },
    //工具类begin
    // 分段字符串 
    splitStr (str, arr) {
      var len = str.length
      var result=[]
      arr.map((val,i)=>{
        var end = len;
        if (i !== arr.length-1) {
          end = arr[i+1]
        }
        result.push(str.slice(val, end))
      })
      return result
    },
    // 获取匹配到的值的所有下标
    getMatch (str, reg) {
      var result = [];
      var arr = true;
      if (typeof reg === 'object') {
        while(arr){
          arr = reg.exec(str)
          if (arr) {
            var index = arr.index;
            reg.lastIndex;
            result.push(index);
          } else {
            break
          }
        }
      } else if (typeof reg === 'string') {
        let index = -1;
        var beforeIndex = 0;
        while(arr){
          index = str.indexOf(reg)
          if (index !== -1) {
            str = str.slice(index+reg.length)
            result.push(index+beforeIndex);
            beforeIndex = index+reg.length
          } else {
            break
          }
        }
      }
      return result
    }
  }
}