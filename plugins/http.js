export default function ({ $http }) {
  const token = localStorage.getItem('token')
  $http.setToken(token, 'Bearer')
  $http.setBaseURL('http://127.0.0.1:8000/api/')

  $http.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $http.onError((error) => {
    if (error.statusCode === 500) {
      console.log('Request Error!')
    }
    // Tip: error.response will be undefined if the connection dropped to the server
    // Tip: You can use error.response.data to get response message
    // Tip: You can return an object or Promise as fallback response to avoid rejection
  })
}
