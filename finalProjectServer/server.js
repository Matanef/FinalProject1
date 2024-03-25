const cors = require('cors');
const express = require('express');
const app = express();
const recipmeRouter  = require('./routes/recipmeRoutes.js')

app.use(express.urlencoded({extended:true}));
app.use(cors({credentials:true}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});

app.use('/', express.static(__dirname + "/public"));

app.use(recipmeRouter)
app.use('/users', recipmeRouter)