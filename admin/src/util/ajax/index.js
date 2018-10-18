import apiMap from './api'

export default function CallApi(apiName, params, openLoading) {
    return new Promise((resolve, reject) => {
        let loading
        if (openLoading) {
        }
        apiMap[apiName](params).then(res => {
            loading && loading.close()
            const resData = res.data
            if (resData.status === 200) {
                resolve(resData.data)
            } else {
                reject(resData)
            }
        }).catch(err => {
            loading && loading.close()
            console.error(err.message)
        })
    })
}

