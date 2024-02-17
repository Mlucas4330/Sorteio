import io from 'socket.io-client';

const baseUrl = import.meta.env.VITE_NODE_ENV === 'development'
  ? import.meta.env.VITE_API_URL + 'api/'
  : 'api/';

const baseUrlSocket = import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_API_URL : '';

const socket = io(baseUrlSocket);

const setToken = token => localStorage.setItem('token', token)

const getToken = () => localStorage.getItem('token')

const destroyToken = () => {
  localStorage.removeItem('token')
  return null
}

const blobToImage = (image) => {
  if (!image?.data) {
    return null
  }

  const bytea = new Uint8Array(image.data);

  const blob = new Blob([bytea], { type: 'image/jpeg' });

  return URL.createObjectURL(blob);
}

const decodeToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

const currencyFormatter = value => {
  const floatvalue = parseFloat(value) || 0
  return floatvalue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

const timeFormatter = timestamp => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};


export { blobToImage, decodeToken, currencyFormatter, timeFormatter, getToken, setToken, destroyToken, baseUrlSocket, baseUrl, socket }