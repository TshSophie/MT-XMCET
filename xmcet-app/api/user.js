import { apiResquest } from '@/utils/request.js'

export const getToken = (data) => {
	return apiResquest({
		url: 'user/token',
		method: 'GET',
		data
	})
}

export const authorizeUserInfo = (data) => {
	return apiResquest({
		url: 'user/authorizeUserInfo',
		method: 'PUT',
		data
	})
}