import { apiResquest } from '@/utils/request.js'

export const getUpdateLogs = (data) => {
	return apiResquest({
		url: 'appSetting/getUpdateLogs',
		method: 'GET',
		data
	})
}
