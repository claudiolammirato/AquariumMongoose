const axios = require('axios')

const sendGetRequest = async () => {
    try {
        const resp = await axios('http://localhost:4000/about', {
          method: 'GET',
          withCredentials: true,
          headers: { Cookie: 'TWFydGE6MTIzNA==' }
        }).then(res => {
              console.log(res.data);
            }).catch(err => {
              console.log(err.response);
            })
        
        //console.log(resp);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};



sendGetRequest();