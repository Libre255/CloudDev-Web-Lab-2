const express = require('express');
const cors = require('cors');
const uniqid = require('uniqid');

let app = express();
const serverPORT = process.env.PORT || 8080;

//Data
let ListofClothes = [
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
app.get('/getclothes', (req, res) =>{
    res.json(ListofClothes);
})
app.post('/addclothes', (req, res) => { 
    const NewClothes = {
        id:uniqid(),
        type:req.body.type,
        name:req.body.name
    }
    ListofClothes.push(NewClothes)
    res.json({addedItem:NewClothes,
        UpdatedList:ListofClothes})
})
app.delete('/deletclothes', (req, res) => {
    let foundID = ListofClothes.find(clothes => toString(clothes.id) === toString(req.body.id))
    if(foundID){
        ListofClothes = ListofClothes.filter(clothes => clothes.id != req.body.id);
        res.json({result:"Deleted succesfully",
        newList:ListofClothes})
    }else{
        res.json({result:"Couldnt find the id"})
    }
})

app.listen(serverPORT, ()=>{
    console.log({msg:"Server has been initialized at PORT: " + serverPORT});
})