const app = require("./src/app.js");
const connectDB = require("./src/db/connectdb.js");

const start = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("runing on 3000");
    });
  } catch (error) {
    console.log("error occured");
  }
};

start();
