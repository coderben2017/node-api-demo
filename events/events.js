var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter();

life.setMaxListeners(11); // 自定义监听器最大数量


/**
 * addEventListener 
 */

life.on('visit', (who) => {
	console.log('给 ' + who + ' 添茶');
});
life.on('visit', (who) => {
	console.log('给 ' + who + ' 倒水');
});
life.on('visit', (who) => {
	console.log('给 ' + who + ' 按肩'); // 监听器最多可以设置10个，超过会在运行时报错
});

// life.emit('接待', 'Bob');
var hasVisitListener = life.emit('visit', 'Bob'); // 返回bool值，表示‘接待’事件是否已被监听
console.log(`visit事件是否已监听：${hasVisitListener}`);
console.log(`visit事件监听函数个数：${life.listeners('visit').length}\n`);


/**
 * removeListener 
 */

function chatWith(who) {
	console.log('找 ' + who + ' 聊天');
}

life.on('chat', chatWith);
console.log('chat事件是否已监听：' + life.emit('chat', 'Mary'));
//console.log(`chat事件监听函数个数：${life.listeners('chat').length}`);
console.log(`chat事件监听函数个数：${EventEmitter.listenerCount(life, 'chat')}`);

// 单独去除事件监听
life.removeListener('chat', chatWith);
console.log('chat事件是否已监听：' + life.emit('chat', 'Mary'));
console.log(`chat事件监听函数个数：${life.listeners('chat').length}\n`);

// 批量去除事件监听
// life.removeAllListeners();
life.removeAllListeners('visit');

