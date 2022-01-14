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
