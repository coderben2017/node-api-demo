var http = require('http');
var Promise = require('bluebird');
var cheerio = require('cheerio');

var baseUrl = 'http://www.imooc.com/learn/';
var url = 'http://www.imooc.com/learn/348';
var videoIds = [348, 259, 191, 134, 75];

function filterChapters(html) {
	var $ = cheerio.load(html);
	var chapters = $('.learnchapter');
	var title = $('#page_header .path span').text();
	var number = parseInt($($('.info_num i')[0]).text().trim(), 10);

	// courseData = {
	// 	title: title,
	// 	number: number,
	// 	videos: [
	// 		{
	// 			chapterTitle: '',
	// 			videos: [
	// 				title: '',
	// 				id: ''
	// 			]
	// 		}
	// 	]
	// }

	var courseData = {
		title: title,
		number: number,
		videos: []
	};

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

		courseData.videos.push(chapterData);
	});

	return courseData;
}


function printCourseInfo(coursesData) {
	coursesData.forEach((courseData) => {
		console.log(courseData.number + '人学习过' + courseData.title + '\n');
	});

	coursesData.forEach((courseData) => {
		console.log('### ' + courseData.title + '\n');

		courseData.videos.forEach((item) => {
			var chapterTitle = item.chapterTitle;

			console.log(chapterTitle + '\n');

			item.videos.forEach((video) => {
				console.log('【' + video.id + '】' + video.title + '\n');
			});
		});
	});
}

function getPageAsync(url) {

	return new Promise((resolve, reject) => {

		console.log('正在爬取 ' + url);

		http
			.get(url, (res) => {
				var html = '';

				res.on('data', (data) => {
					html += data;
				});

				res.on('end', () => {
					resolve(html);
				});
			})
			.on('error', (e) => {
				reject(e);
				console.log('获取课程数据出错！');
			});

	});

}

var fetchCourseArray = [];

videoIds.forEach((id) => {
	fetchCourseArray.push(getPageAsync(baseUrl + id));
});

Promise
	.all(fetchCourseArray)
	.then((pages) => {
		var coursesData = [];

		pages.forEach((html) => {
			var courses = filterChapters(html);
			coursesData.push(courses);
		});

		coursesData.sort((a, b) => {
			return a.number < b.number;
		});

		printCourseInfo(coursesData);
	})
