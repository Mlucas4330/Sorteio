import { baseUrl } from '../utils'

const useSendData = async (url, body, token) => {
    let options = {
        method: 'POST',
        body: JSON.stringify(body),
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

export default useSendData