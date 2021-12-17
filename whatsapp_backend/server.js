// importing 
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';

// app config
const app = express();
const port = process.env.PORT || 9000; 

const pusher = new Pusher({
    appId: "1315740",
    key: "f8ea01d9149654aa4dd2",
    secret: "a7984996f7a574fe497b",
    cluster: "ap2",
    useTLS: true
  });

//middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

// DB config
const connection_url = "mongodb+srv://<YourAccountName>:<YourPassword>@cluster0.6nzih.mongodb.net/<YourDatabaseName>?retryWrites=true&w=majority"
mongoose.connect(connection_url);

const db = mongoose.connection;

db.once("open", ()=> {
    console.log("DB is connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("A change occured", change);

    if(change.operationType==="insert")
    {
        const messageDetails = change.fullDocument;
        pusher.trigger("messages", "inserted", {
            name: messageDetails.name,
            message: messageDetails.message,
            timestamp: messageDetails.timestamp,
            received: messageDetails.received,
        });
    }else{
        console.log("error triggering Pusher")
    }
  })
})

// ??????

// api routes
app.get('/',(req,res)=>{res.status(200).send("Hello World")});

app.get('/messages/sync', (req,res) => {

    Messages.find((err,data) =>
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req,res) => {
    const dbMessages = req.body

    Messages.create(dbMessages, (err,data) =>
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(201).send(data)
        }
    })
})

// listen
app.listen(port, ()=>{console.log(`Listening on localhost:${port}`)});