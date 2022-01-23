import { apiResquest } from '@/utils/request.js'

export const getDetail = (data) => {
	return apiResquest({
		url: 'course/getDetail',
		method: 'GET',
		data
	})
}

export const postAnswer = (data) => {
	return apiResquest({
		url: 'course/answer',
		method: 'POST',
		data
	})
}
