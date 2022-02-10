const  mongoose  = require("mongoose");
mongoose.Promise  = require("bluebird");
const  url  =  'mongodb+srv://RudieH:Jemima2308@chatmess.lci4e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const  connect  =  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology:true})
module.exports  =  connect;


