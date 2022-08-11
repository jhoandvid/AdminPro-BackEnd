const { Schema, model } = require('mongoose');


const HospitalShema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type:String,
    },

    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }

}, {collection: 'hospitales'});

HospitalShema.method('toJSON', function(){
   const {__v, ...object} =this.toObject();
   return object;
})

module.exports=model('Hospital', HospitalShema);
