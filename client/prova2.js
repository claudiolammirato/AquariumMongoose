var urllib = require('urllib');



var claudio = function postReq(){
    urllib.request('http://localhost:4000/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    content: JSON.stringify({
        username: 'Marta',
        password: '1234'
    })
    }, function (err, data, res){
        if (err) {
            throw err; // you need to handle error
        }
        //console.log(res.statusCode);
        //console.log(res.headers);
        // data is Buffer instance
        //console.log(data.toString());
        return res;
        
    });
}


function getReq(){
    urllib.request('http://localhost:4000/about', {
    method: 'GET',
    data: {
        'a': 'hello',
        'b': 'world'
    }
    }, function (err, data, res){
        //console.log(res.statusCode);
        //console.log(res.headers);
        // data is Buffer instance
        //console.log(data.toString());
        

    });
}
let promessaCompiti = new Promise(async function(resolve,reject){
    try{
        resolve(await claudio);
 } catch(error){
        reject(error);
 }
});
promessaCompiti.then(function(statoCompiti){
    getReq()
    console.log('I compiti sono: ' + statoCompiti);
}).catch(function(statoCompiti){
    console.log('I compiti sono: ' + statoCompiti);
});