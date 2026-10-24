require("dotenv").config();

const PORT = process.env.PORT || 8000
const JWT_SECRET = process.env.JWT_SECRET

if(!JWT_SECRET){
    throw new Error("NO JWT secret key")
}

module.exports={
    PORT,
    JWT_SECRET
}