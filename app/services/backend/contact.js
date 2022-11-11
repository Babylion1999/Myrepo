const { options } = require("mongoose");
const MainModel 	= require(__path_schemas + 'contact');
const nodemailer = require("nodemailer");

module.exports = {
    listItems:async(objWhere)=>{    
        return MainModel
            .find(objWhere)    
    },
    form: async(id, options=null)=>{
        let result='';
        result = await MainModel.findById(id).then(res=>{
            return res
        }).catch(err=>{
            return
        }); 
        return result
    },
    saveItems: (item,options=null)=>{
        if(options.task=='add'){ 
            return new MainModel(item).save()
        }
    },
    sendEmail: async(emailReceive)=>{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'huutoan300896@gmail.com', // generated ethereal user
              pass: 'vydxvkvcqnovaboi', // generated ethereal password
            },
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"HuuToan 👻" <huutoan300896@gmail.com>', // sender address
            to: emailReceive, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Hello world?</b>  
            `, // html body
          });

    }
}