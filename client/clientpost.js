const axios = require('axios')

const username = 'Marta'
const password = '1234'

const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

const url = 'http://localhost:4000/auth/login'
const data = {
  username: username,
  password: password
}

const sendPostRequest = async () => {
  try {
      const post = await axios.post(url, data, {
  headers: {
    'Authorization': `Bearer ${token}`
  },
})
.then((res) => {
    //console.log(res.config.headers.Authorization.split(' ')[1])
    console.log(res)
  })
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};





sendPostRequest();
//sendGetRequest();