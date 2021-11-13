// import { connect } from "mongoose";
import mongoose from "mongoose";
const connectDB = async () => {
  // Connecting to the database
  try{const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
   
      console.log("Successfully connected to database");
  }catch(error) {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    }
}
// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       // useFindAndModify: false,
//       useCreateIndex: true,
//     });
//     console.log(`Mongo db connected" ${conn.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.log(`error is ${error.message}`.red.underline.bold);
//     process.exit(1);
//   }
// };

export default connectDB;