import { baseUrl } from '../utils'

const useFetchData = async (url, token = null) => {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        options.headers['Authorization'] = 'Bearer ' + token
    }

    const response = await fetch(baseUrl + url, options)

    const result = await response.json()

    return result
}

export default useFetchData