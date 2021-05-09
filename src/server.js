const express = require("express");
const morgan = require('morgan');
const cors = require("cors")
const router = require("./routes")


const app = express()
app.use(cors())

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(morgan("dev"));



//parse requests of content-type - application/json

app.use("/api/", router);
// 404 error
app.all('*', (req, res) => {
    res.status(404).send({
        message: "Endpoint Not Found"
    });
});

app.listen(8000, () => {
    console.log(`🚀 Server running on port 8000`)
})