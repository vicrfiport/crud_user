const express = require("express")
const router = express.Router()
const {register,detail,findone,update,destroy} = require("../action/user_action")
const {check, validationResult, body} = require("express-validator")


router.post("/", 
[

    check("nama")
        .not()
        .isEmpty(),
    check("email")
        .not()
        .isEmpty(),
    check("phone")
        .not()
        .isEmpty(),
    check("username")
        .not()
        .isEmpty(),
    check("gender")
        .not()
        .isEmpty(),
    check("password")
        .not()
        .isEmpty()
        .isLength({min : 8}),
    check("password_confirmation")
        .not()
        .isEmpty(),
    body("password_confirmation").custom((value,{req}) => {

        if (value != req.body.password) {
            throw new  error("password confirmation does not match")
        } else{
            return true
        }
    })
],

  async (req,res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.send({

          code: 400,
          status: "error",
          message: errors.array()
        })
    }


try {
          let data = await new register(req).exec()
          return res.send({
              code: 201,
              status: "succes",
              message: "register succesfully !",
              data
          })
    } catch (err) {

        return res.send({
            code: 400,
            status: "error",
            message: err.message

        })
    }
  }
)

router.get("/find",async (req,res) => {

    try {

        let data = await new detail(req).exec()

        return res.send({
            status: "success",
            data,
            message: "semua data tampil"
        })
        
    } catch (error) {
        return res.status(400).json({

            satatus : "faild",
            message : error.message
        })
    }
    

})

router.get("/:id", async (req,res) => {

    try {

        let {id} = req.params
        let data = await new findone(id).exec()

        return res.status(200).json({
            status: "success",
            data,
            message: "data berhasil dibuat"
        })
        
    } catch (err) {
        return res.status(400).json({

            satatus : "faild",
            message : err.message
        }
        )
    }
}
)


router.put("/:id", async (req, res) => {
    let { id } = req.params
    let updated_data = {
        nama: req.body.nama,
        email: req.body.email,
        phone: req.body.phone,
        
    }

    try {
        let data = await new update(id, updated_data).exec()

        return res.status(200).json({
            status: "success",
            data,
            message: "User data updated successfully!"
        })
    } catch(err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    let { id } = req.params

    try {
        let data = await new destroy(id).exec()

        return res.status(200).json({
            status: "success",
            data,
            message: "User data deleted successfully!"
        })
    } catch(err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})


module.exports = router