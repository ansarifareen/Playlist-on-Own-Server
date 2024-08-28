//importing express module
const express = require('express');
//importing path
const path = require('path');
//initializing the app
const app = express();
const port=5000;

// serve static files from the pulic directory
app.use(express.static(path.join(__dirname,'public')));

//define one route
app.get("/",(req,res)=>{
//       res.send('Hi ,I am live');
    res.sendFile(path.join(__dirname, 'public','index1.html'));
});

app.listen(port, () => {
        console.log(`Yes I am connected on http://localhost:${port}`);
});
