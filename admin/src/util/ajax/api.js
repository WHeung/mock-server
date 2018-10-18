import axiosRequest from './axiosRequest'

function getTimeStamp () {
  return new Date().getTime()
}

const apiMap = {}

apiMap['UPDATE_MOCK'] = (data) => {
  const reqData = { ...data, t: getTimeStamp }
  return axiosRequest.post('/update_mock', JSON.stringify(reqData))
}

export default apiMap
