const user = require("../model/user_model")
const bcrypt = require("bcryptjs")


class register {
    constructor(req) {

        (
            this.nama = req.body.nama
        ),
        (
            this.phone = req.body.phone
        ),
        (
            this.email = req.body.email

        ),
    
        (
            this.username = req.body.username
        ),
        (
            this.password = req.body.password
        ),
        (
            this.password_confirm = req.body.password_confirm
        ),
        (
            this.gender = req.body.gender
        ),
        (
            this.activation_token = req.body.activation_token
        )

    }

    async exec() {

        try {
           
        

        let password = bcrypt.hashSync(this.password, 8)
        
        
        let insert_data = {

            nama:  this.nama,
            username: this.username,
            email: this.email,
            phone: this.phone,
            gender: this.gender,
            activation_token:null,
            activated_at:null,
            password

        }

        let query = new user(insert_data)
        await query.save()

      
            
            return {
                query
            }
            } 
             catch (err){
            throw err
        }
    }
            
}

    class detail  {
        async exec() {

            try {
  
                let query = await user.find({}).exec()
                
             
                      
                return query
                  
              } catch (err) {
                  throw err
                  
              } 
            }
          
        }

    class findone {
       
        constructor(id){
        this.id =id
        }
       
        
          async exec() {

                try {
                        
                let query = await user.findOne({ _id:this.id}).exec()
                
                return query
                
                    } catch (err){
                        throw err
                        }
                }
        

        }

        
            class update {
                constructor(params, updated) {
                    this.params = params,
                    this.updated = updated
                }
            
                async exec() {




                    try {
                        let update = await user.findOneAndUpdate(
                            this.params,
                            this.updated, 
                            {
                                new: true
                            }).exec()
            
                        return update
                    } catch(err) {
                        throw err
                    }
                }
            }
        
        
            class destroy  {


                constructor (id){
                    this.id =id
                }
               async exec(){
                try {
                    let query = await user.findOneAndDelete({
                        _id: this.id
                    }).exec()
            
                    return query
                } catch(err) {
                    throw err
                }
            }
        }
        
        
    
    

    





    module.exports ={

     register,detail,findone,update,destroy

    }
