import { apiResquest } from '@/utils/request.js'

export const getDetail = (data) => {
	return apiResquest({
		url: 'course/getDetail',
		method: 'GET',
		data
	})
}
