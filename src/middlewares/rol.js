require("dotenv").config()
const jwt = require("jsonwebtoken")
module.exports = {

rol:(roles)=>{
    return (req, res, next)=>{
        try{
            let token = req.headers.authorization.split(" ")[1]
            //console.log(roles)
            //console.log(token)
            let userData =jwt.verify(token, process.env.SECRETO)
            let userRol = userData.roles
            //console.log(userRol)
            let rol = 0
            req.query.data = userData
            for (ele in roles){
                if(userRol.includes(roles[ele])){
                    next()
                }else{
                    rol ++
                }
            }
            if(rol == roles.length){
                res.json({mensaje: "no rol"})
            }
        }catch(err){
            console.log("error en rol")
            res.json({err})
        }
    }
}
}
