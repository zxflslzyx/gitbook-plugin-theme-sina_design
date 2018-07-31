var $ = require('jquery');
var gitbook = window.gitbook;
var platform = require('./platform');

// Return true if sidebar is open
function isOpen() {
	return gitbook.state.$book.hasClass('with-summary');
	
	
}

function tabNav(e) {

	//移动端移除 show 类
	hiddenAll();
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	gitbook.storage.set("navIndex", $(this).index());
	
	e.stopPropagation();
}

function showSearch(e) {
	$("#book-search-input input").focus();
	$(".searchWrap").addClass('show');

	//出发tab 的时候，隐藏 侧栏
	if(platform.isMobile()) {
		toggleSidebar(false, true);
	}
	//	e.stopPropagation();
}

function showNavWrap(e) {
	$(".nav_wrap").addClass('show');
	e.stopPropagation();

	//出发tab 的时候，隐藏 侧栏
	if(platform.isMobile()) {
		toggleSidebar(false, true);
	}
}

//隐藏所有 弹窗
function hiddenAll() {
	$(".nav_wrap").removeClass('show');
	
}

function toggleIcon(e) {
	var status = gitbook.storage.get('sidebar', true);
	$(".btn_bar").toggleClass('close', status)
}

function cancelResult(event) {
	$('#book-search-results').removeClass('open');
	$("#book-search-input input").val("")
	$(".searchWrap").removeClass('show');
	event.stopPropagation();
}

//控制侧栏的 拉开或者 展开
function toggleSidebar(_state, animation) {
	if(gitbook.state != null && isOpen() == _state) return;
	if(animation == null) animation = true;
	gitbook.state.$book.toggleClass('without-animation', !animation);
	gitbook.state.$book.toggleClass('with-summary', _state);
	gitbook.storage.set('sidebar', isOpen());
	
	//根据slidebar状态 显示不同的 icon
	toggleIcon();
}

function removePlaceholder() {
	$(this).attr('placeholder', '');
}

function showPlaceholder() {
	$(this).attr('placeholder', '输入并搜索');
}

// Bind all dropdown
function init() {
	window.onload = function() {}
	//底部logo
	$(".page-wrapper").append('<aside class="bottom_logn"></aside>');
	console.log($(".page-wrapper"))

	$(document).on('click', '.header_bar', toggleIcon);
	$(document).on('click', '.nav_wrap .nav', tabNav);

	//移动端事件
	$(document).on('touchend click', '.sinaTop .sina_searchBox', showSearch);
	$(document).on('touchend click', '.searchWrap .btn_cancel', cancelResult);
	$(document).on('touchend click', '.sinaTop .nav_trigger', showNavWrap);
	$(document).on('focus', '#book-search-input input', removePlaceholder)
	$(document).on('blur', '#book-search-input input', showPlaceholder)

	$(document).on('click', '.book', hiddenAll);

	//页面跳转的时候 切换tab
	gitbook.events.on('page.change', function() {
		//顶部导航
		var curInex = gitbook.storage.get("navIndex");
		var $this = $('.nav_wrap .nav').eq(curInex);
		$this.siblings().removeClass("active");
		$this.addClass("active");
		for(var i = 0; i < $("h2:header").length; i++) {
			console.log($("h2:header").eq(i).html())
		}

	});
}

module.exports = {
	init: init
};