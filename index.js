const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const mongoose = require('mongoose')

const Video = require('./models/videos');
const product = require('./models/products');
const Categorie = require('./models/categories');

const app = express();

mongoose.connect('mongodb://localhost/ynetflix')

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';

const SELECT_ALL_VIDEOS_QUERY = 'SELECT * FROM videos';



const connection = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password :'',
    database : 'react_sql'
})

connection.connect(err => {
    if(err){
        return err;
    }
    else{
        console.log("connection effectuée")
    }
})


app.use(cors());

app.get('/', (req,res) => {
    res.send('go to /products to see products or go to /videos to see videos');
})

app.get('/products/add',(req,res) => {
    const { name, price} = req.query;
    const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name,price) VALUES ('${name}','${price}')`;
    connection.query(INSERT_PRODUCTS_QUERY,(err,results) =>{
        if(err) {
            return res.send(err)
        }
        else {
            return res.send('Succesfully data added')
        }
    })
    
})
app.get('/products', (req,res) => {

    product.find({}, function(err,data){
        //console.log(data)
        return res.json({
            data: data
        })
    })

    // connection.query(SELECT_ALL_PRODUCTS_QUERY, (err,results) => {
    //     if(err) {
    //         return res.send(err)
    //     }
    //     else {
    //         return res.json ({
    //             data: results
    //         })
    //     }
    // })
})


app.get('/videos/add',async (req,res) => {
    const { idVideo, title, image} = req.query;
    const categorie = 'vide'
    //console.log(idVideo)
    const video  = new Video({
        idVideo,
        title,
        image,
        categorie
    })
    await video.save();
    res.status(200).json({video})
    })

app.get('/videoById', (req,res) => {
    const idVideo = req.query.idVideo
    //console.log(idVideo)
    Video.findById(idVideo, function(err,data){
        console.log(data)
        return res.json({
            data: data
        })
    })
    
})


app.get('/videoDeleteById', (req,res) => {
    const idVideo = req.query.idVideo
    //console.log(idVideo)

    var myquery = { _id: idVideo };
    Video.deleteOne(myquery, function(err, data) {
      if (err) throw err;
      Video.find({}, function(err,data){
        //console.log(data)
        return res.json({
            data: data
        })
    })
      
    });
})

    app.get('/videoCategorie', (req,res) => {
        const idVideo = req.query.idVideo
        //console.log(idVideo)
        // var myquery = ({ _id: idVideo },{"address_ids":0});
         var myquery = ({ _id: idVideo },{address_ids: 0});

           Video.find(myquery, function(err,data){
               console.log(data)
             data = (data[0])
             return res.json({
                 data: data
             })
         })
          
        });


app.get('/videos', (req,res) => {
    Video.find({}, function(err,data){
        //console.log(data)
        return res.json({
            data: data
        })
    })
    
    // connection.query(SELECT_ALL_VIDEOS_QUERY, (err,results) => {
    //     if(err) {
    //         return res.send(err)
    //     }
    //     else {
    //         return res.json ({
    //             data: results
    //         })
    //     }
    // })
})


app.get('/categories', (req,res) => {
    Categorie.find({}, function(err,data){
        //console.log(data)
        return res.json({
            data: data
        })
    })
      
    });



    app.get('/ajouteCategories', (req,res) => {
        const { idVideo, categorieVideo} = req.query;
        
        console.log(categorieVideo)
        console.log(idVideo)
        var myquery = { $set: { categorie : categorieVideo}}
            
         Video.findByIdAndUpdate( idVideo , myquery , {new : true},  function(err,data) {
             if (err) throw err
            //console.log(data)
            data = (data)
            return res.json({
                data: data
            })
        })

          
    });



app.listen(4000, () => {
    console.log("Listenning on port 4000")
})
