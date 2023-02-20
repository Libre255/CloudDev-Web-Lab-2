const express = require('express');
const cors = require('cors');
const uniqid = require('uniqid');

let app = express();
const serverPORT = process.env.PORT || 8080;

//Data
let ListOfClothers = [
 { id:1, type:"t-shirt", name:"Fire sun"},
 { id:uniqid(), type:"pants", name:"Zem"},
 { id:uniqid(), type:"t-shirt", name:"Rainbow"},
 { id:uniqid(), type:"coat", name:"Halam"},
 { id:uniqid(), type:"coat", name:"Capa Magic"},
 { id:uniqid(), type:"coat", name:"Alasum"},
]
//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
//APIs
app.get('/getClothes', (req, res) =>{
    res.json(ListOfClothers);
})
app.post('/AddClothes', (req, res) => { 
    const NewClothes = {
        id:uniqid(),
        type:req.body.clotheType,
        name:req.body.clotheName
    }
    ListOfClothers(NewClothes)
    res.json(NewClothes)
})
app.delete('/deletclothes', (req, res) => {
    let foundID = ListOfClothers.find(clothes => clothes.id === req.body.id)
    if(foundID){
        ListOfClothers = ListOfClothers.filter(clothes => clothes.id != req.body.id);
        res.json({result:"Deleted succesfully"})
    }else{
        res.json({result:"Couldnt find the id"})
    }
})

app.listen(serverPORT, ()=>{
    console.log({msg:"Server has been initialized at PORT: " + serverPORT});
})