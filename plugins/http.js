export default function ({ $http }) {
  const token = localStorage.getItem('token')
  $http.setToken(token, 'Bearer')
  $http.setBaseURL('http://localhost:8000/api/')

  $http.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $http.onError((error) => {
    if (error.statusCode === 500) {
      console.log('Request Error!')
    }

    if (error.statusCode === 401) {
      console.log('Take me to login page')
    }
    // Tip: error.response will be undefined if the connection dropped to the server
    // Tip: You can use error.response.data to get response message
    // Tip: You can return an object or Promise as fallback response to avoid rejection
  })
}
