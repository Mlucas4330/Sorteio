const baseUrl = import.meta.env.VITE_NODE_ENV === 'development'
  ? import.meta.env.VITE_API_URL + 'api/'
  : 'api/';

const baseUrlSocket = import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_API_URL : '';


const fetchData = async (url, token = null) => {
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

const sendData = async (url, body, token) => {
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

const setToken = token => localStorage.setItem('token', token)

const getToken = () => localStorage.getItem('token')

const destroyToken = () => {
  localStorage.removeItem('token')
  return null
}


export { fetchData, getToken, setToken, destroyToken, sendData, baseUrlSocket, baseUrl }