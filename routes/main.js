const index = require("./index")
const user = require("./user_route")

const route = app => {

    app.use("/",index)
    app.use("/user",user)

    
}

module.exports = route