# texthandle

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
###一个处理HTML文档的组件，自动按照h标签分页
###目前逻辑是按照最大的标签（例如h1）先做一次拆分
###然后分别对拆分后的数据进行二次拆分（二次拆分按照最大标签的下一个最大标签 h2/h3/h4/h5/h6）,然后生成分页和目录

###demo图
![image](https://github.com/luckydogM/texthandle/blob/master/demo.png )   
