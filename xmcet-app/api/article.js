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

// 收藏文章
export const collectArticle = (data) => {
	return apiResquest({
		url: 'userCollect/article',
		method: 'POST',
		data
	})
}
