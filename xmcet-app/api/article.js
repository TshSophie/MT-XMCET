import { apiResquest } from '@/utils/request.js'

export const getArticleDetail = (data) => {
	return apiResquest({
		url: 'article/getDetail',
		method: 'GET',
		data
	})
}

export const getListForIndexPage = (data) => {
	return apiResquest({
		url: 'article/getListForIndexPage',
		method: 'GET',
		data
	})
}

// 点赞文章
export const likeArticle = (data) => {
	return apiResquest({
		url: 'userLike/article',
		method: 'POST',
		data
	})
}

// 点赞文章列表
export const getLikeArticleList = (data) => {
	return apiResquest({
		url: 'userLike/articleList',
		method: 'GET',
		data
	})
}

// 收藏文章
export const collectArticle = (data) => {
	return apiResquest({
		url: 'userCollect/article',
		method: 'POST',
		data
	})
}

// 收藏文章列表
export const getCollectArticleList = (data) => {
	return apiResquest({
		url: 'userCollect/articleList',
		method: 'GET',
		data
	})
}

// 订阅文章专栏
export const subscribeArticleCategory = (data) => {
	return apiResquest({
		url: 'userSubscribe/articleCategory',
		method: 'POST',
		data
	})
}

// 订阅文章专栏列表
export const getSubscribeArticleCategoryList = (data) => {
	return apiResquest({
		url: 'userSubscribe/articleCategoryList',
		method: 'GET',
		data
	})
}

// 文章分类树
export const getArticleCategory = (data) => {
	return apiResquest({
		url: 'article/category',
		method: 'GET',
		data
	})
}

// 文章列表
export const getArticleList = (data) => {
	return apiResquest({
		url: 'article/list',
		method: 'GET',
		data
	})
}

// 文章列表按分类
export const getArticleListByCategory = (data) => {
	return apiResquest({
		url: 'article/listByCategory',
		method: 'GET',
		data
	})
}