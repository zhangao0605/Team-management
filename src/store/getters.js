const getters = {

  language: state => state.app.language,
  seturl: state => state.app.get_url,
  token: state => state.login.token,
  roles: state => state.login.roles,
}
export default getters
