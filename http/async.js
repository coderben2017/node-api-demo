// 同步
// var i = 0;
// while (i < 100) {
// 	i++;
// 	console.log(i);
// }
// console.log(1);

// 异步
var c = 0;

function printIt() {
	console.log(c);
}

function plus(callback) {
	setTimeout(function() {
		c += 1;
		callback();
	}, 1000);
}

plus(printIt);