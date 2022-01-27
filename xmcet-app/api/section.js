import { apiResquest } from '@/utils/request.js'

export const getSectionList = (data) => {
	return apiResquest({
		url: 'section/getSectionList',
		method: 'GET',
		data
	})
}

export const getCourseListBySectionId = (data) => {
	return apiResquest({
		url: 'section/getCourseListBySectionId',
		method: 'GET',
		data
	})
}

export const getVocabularyListByWeek = (data) => {
	return apiResquest({
		url: 'section/getVocabularyListByWeek',
		method: 'GET',
		data
	})
}
