const mongoose = require('mongoose');

    const connectDB = async () => {
      try {
          if (process.env.NODE_ENV === "production") {
              const uri = "mongodb://maliq:maliq@cluster0-shard-00-00.v6cc0.mongodb.net:27017,cluster0-shard-00-01.v6cc0.mongodb.net:27017,cluster0-shard-00-02.v6cc0.mongodb.net:27017/employeedb?ssl=true&replicaSet=atlas-12uo26-shard-0&authSource=admin&retryWrites=true&w=majority"
              mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false });
              const connection = mongoose.connection;
              connection.once('open', (error, db) => {
                  if (error) {
                      console.log("Error connecting to  DB ", error);
                     
                  } else {
                      console.log("Connected to  DB");
                      // initial();
                  }
              })
  
          } else {
              const URI = "mongodb://maliq:maliq@cluster0-shard-00-00.v6cc0.mongodb.net:27017,cluster0-shard-00-01.v6cc0.mongodb.net:27017,cluster0-shard-00-02.v6cc0.mongodb.net:27017/employeedb?ssl=true&replicaSet=atlas-12uo26-shard-0&authSource=admin&retryWrites=true&w=majority"
              mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false }, (error) => {
                  if (error) {
                      console.log("Error connecting to  DB Local");
  
                  } else {
                      console.log("Connected to  DB Local");
                      // initial()
                  }
              });
          }
      }
      catch (err) {
          console.error(err.message)
          process.exit(1)
      }
  }
module.exports = connectDB;