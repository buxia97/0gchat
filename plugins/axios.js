export default function ({ $axios, redirect }) {
  $axios.defaults.timeout = 60000;
  $axios.defaults.baseURL = process.env.baseUrl;
  // $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded');
  $axios.onRequest(config => {
    //console.log('Making request to ' + config.url)
  })
  $axios.onResponse((response) => {
      //console.log(response.data)
  })

  $axios.onError(error => {
    // const code = parseInt(error.response && error.response.status)
    // if (code === 400) {
    //   redirect('/400')
    // }
  })
}
