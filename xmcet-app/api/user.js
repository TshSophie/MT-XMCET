import { apiResquest } from '@/utils/request.js'

export const login = (query) => {
	return apiResquest({
		url: '这里是API的地址',
		method: 'POST',
		query: {...query}
	})
}