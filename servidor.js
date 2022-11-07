const express = require('express'); //importatr express
const app = express(); //usar función express
const Contenedor = require('./manejadorarchivos'); //importar la Clase
const contenedor = new Contenedor('productos.txt');// se crea el objeto contenedor

contenedor.save({title: 'ASUS ROG Strix Scope NX TKL 80% Gaming Keyboard', 
        price: 9000, 
        thumbail: 'https://www.bhphotovideo.com/images/images2500x2500/asus_x802_strix_scope_nx_tkl_nxbn_us_rog_strix_scope_nx_1660962.jpg'}
    );

setTimeout(_ => {
    contenedor.save({title: 'MOUSE ROG AMBIDEXTROUS', 
        price: 9000, 
        thumbail: 'https://dlcdnwebimgs.asus.com/gain/1DD15AA1-E647-4ABE-8D7B-5F840095D231/w750/h470'}
    );
}, 200);

setTimeout(_ => {
    contenedor.save({title: 'Asus ROG Strix XG279Q led 27" negro 100V/240V', 
    price: 9000, 
    thumbail: 'https://http2.mlstatic.com/D_NQ_NP_2X_633799-MLA48811856142_012022-V.webp'}
);
},300);

app.listen(8080,()=>{ //número del puerto
    console.log('escuchando por el puerto 8080');
})

app.get('/productos', async (req, res)=>{
    res.send(await contenedor.getAll()); //enviar
})

app.get('/productoRandom', async (req, res)=>{
    const numeroRandom = Math.floor(Math.random() * 3) + 1;
    res.send( await contenedor.getById(numeroRandom));
})

//ruta por defecto 127.0.0.1:puerto
//localhost: puerto