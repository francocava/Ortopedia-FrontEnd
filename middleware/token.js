export default function ({
  route,
  store,
  redirect,
  $axios,
  $config: { baseURL },
}) {
  console.log('v0.2.7')

  if (route.name === 'login') return

  if (!localStorage.getItem('token')) location.href = '/login'
}
