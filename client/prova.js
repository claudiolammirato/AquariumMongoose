const bent = require('bent')

const getJSON = bent('json')
const getBuffer = bent('buffer')



async function postReq() {
  try{
const post = bent('http://localhost:4000/', 'POST', 'json', 200);
const response =  await post('auth/login', {username: 'Marta', password: "1234"});

//console.log(response)

//const getStream = bent('http://localhost:4000/')

//let stream = await getStream('/about')
// status code
//stream.status // 200
//stream.statusCode // 200
// optionally decode
//const str = await stream.text()

//console.log(obj)
console.log('in')

} catch (error){
  console.log(error)
}
}

postReq();


//let buffer = await getBuffer('http://site.com/image.png')