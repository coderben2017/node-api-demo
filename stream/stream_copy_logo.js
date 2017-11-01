var fs = require('fs')


/**
 * 同步方式简单读写文件
 */
var source = fs.readFileSync('../buffer/logo.png') // 同步方法不需要添加回调函数

fs.writeFileSync('steam_copy_logo.png', source) // 同步方法不需要添加回调函数