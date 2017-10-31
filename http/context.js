/**
 * 上下文和作用域
 */

// var pet = {
// 	words: '...',
// 	speak: function() {
// 		console.log(this.words);
// 		console.log(this === pet);
// 	}
// };

// pet.speak();



// function pet(words) {
// 	this.words = words;
// 	console.log(this.words);			// this指向global(因为pet是个函数)
// 	console.log(this === global); // this指向global(因为pet是个函数)
// }

// pet('...');



// function Pet(words) {
// 	this.words = words;
// 	this.speak = function() {
// 		console.log(this.words);
// 		console.log(this);
// 	}
// }

// var dog = new Pet('wang'); 
// dog.speak(); // this指向调用speak()方法的对象



// var pet = {
// 	words: '...',
// 	speak: function(say) {
// 		console.log(say + ' ' + this.words);
// 	}
// };

// var dog = {
// 	words: 'wangwang'
// };

// pet.speak.call(dog, 'speak'); // call改变运行时上下文



// function Pet(words) {
// 	this.words = words;
// 	this.speak = function() {
// 		console.log(this.words);
// 	}
// }

// function Dog(words) {
// 	Pet.call(this, words); // 借用构造函数
// 	// Pet.apply(this, arguments);
// }

// var dog = new Dog('wangwangwang');
// dog.speak(); // wangwangwang



