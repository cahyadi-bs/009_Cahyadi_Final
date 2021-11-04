function requireHTTPS(req, res, next){
    // membuat semua request yang sebelumnya HTTP biasa menjadi HTTPS
    if(
        !req.secure
        //khusus unyuk server yang kita deploy di Heroku
        && req.get('x-forwarded-proto') !== 'https'
    ){
        return res.redirect(
            'https://' + req.get('host') + req.url
        )
    }
    next();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 8080

app
.use(requireHTTPS) //komen line ini bila local server
//mengikuti nama app di angular.json
// misal: ./dist/<NAMA APP DI output path>
.use(express.static('./dist/paymentApp')); 


app.get('/*', (req,res)=> res.sendFile('index.html' ,{root: 'dist/paymentApp/'}) )

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})