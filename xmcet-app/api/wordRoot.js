import { apiResquest } from '@/utils/request.js'

export const getList = (data) => {
	return apiResquest({
		url: 'wordRoot/getList',
		method: 'GET',
		data
	})
}

export const getScheduleList = (data) => {
	return apiResquest({
		url: 'wordRoot/getScheduleList',
		method: 'GET',
		data
	})
}

export const getBasicInfo = (data) => {
	return apiResquest({
		url: 'wordRoot/getBasicInfo',
		method: 'GET',
		data
	})
}

export const setPlan = (data) => {
	return apiResquest({
		url: 'wordRoot/setPlan',
		method: 'POST',
		data
	})
}

export const updateRecord = (data) => {
	return apiResquest({
		url: 'wordRoot/updateRecord',
		method: 'POST',
		data
	})
}
