import { apiResquest } from '@/utils/request.js'

export const getFeedback = (data) => {
	return apiResquest({
		url: 'feedback/getListByUser',
		method: 'GET',
		data
	})
}

export const postFeedback = (data) => {
	return apiResquest({
		url: 'feedback/postByUser',
		method: 'POST',
		data
	})
}
