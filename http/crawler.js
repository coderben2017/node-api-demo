var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';

function filterChapters(html) {
	var $ = cheerio.load(html);
	var chapters = $('.learnchapter');

	// [{
	// 	chapterTitle: '',
	// 	videos: [
	// 		title: '',
	// 		id: ''
	// 	]
	// }];

	var courseDate = [];

	chapters.each((item) => {
		var chapter = $(this);
		var chapterTitle = chapter.find('string').text();
		var videos = chapter.find('.video').children('li');
		var chapterData = {
			chapterTitle: chapterTitle,
			videos: []
		};

		videos.each((item) => {
			var video = $(this).find('.studyvideo');
			var videoTitle = video.text();
			var id = video.attr('href').split('video/')[1];

			chapterData.videos.push({
				title: videoTitle,
				id: id
			});
		})

		courseDate.push(chapterData);
	});

	return courseDate;
}


function printCourseInfo(courseDate) {
	courseDate.forEach((item) => {
		var chapterTitle = item.chapterTitle;

		console.log(chapterTitle);

		item.videos.forEach((video) => {
			console.log(' 【' + video + '】 ' + video.title + '\n');
		});
	});
}


http.get(url, (res) => {
	var html = '';

	res.on('data', (data) => {
		html += data;
	});

	res.on('end', () => {
		var courseDate = filterChapters(html);
		printCourseInfo(courseDate);
	});
}).on('error', () => {
	console.log('获取课程数据出错！');
})