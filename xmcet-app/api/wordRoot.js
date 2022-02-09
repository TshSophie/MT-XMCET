import { apiResquest } from '@/utils/request.js'

export const getList = (data) => {
	return apiResquest({
		url: 'wordRoot/getList',
		method: 'GET',
		data
	})
}
