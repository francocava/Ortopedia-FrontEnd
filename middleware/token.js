export default function ({
  route,
  store,
  redirect,
  $axios,
  $config: { baseURL },
}) {
  if (route.name === 'login') return

  if (!localStorage.getItem('token')) location.href = '/login'
}
