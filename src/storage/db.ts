import mongoose from "mongoose";
import bluebird from "bluebird";

type Tinput = {
  dbUrl: string;
};

const connect = ({ dbUrl }: Tinput) => {
  const makeConnection = () => {
    mongoose.Promise = bluebird;
    mongoose
      .connect(dbUrl)
      .then(() => {
        return console.info(`Successfully connected to ${dbUrl}`);
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
      });
  };
  makeConnection();
  mongoose.connection.on("disconnected", makeConnection);
};

export default { connect };
