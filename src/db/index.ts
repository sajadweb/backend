
import * as mongoose from "mongoose";
import {models} from "./Models";

const startDB = () => {
    var db_options = {
        autoReconnect: true,
        poolSize: 20,
        socketTimeoutMS: 480000,
        keepAlive: 300000,
        keepAliveInitialDelay: 300000,
        connectTimeoutMS: 30000,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useNewUrlParser: true
    };
    const user = "root";
    const pwd = "sajadweb1368";
    const url = "ds259255.mlab.com:59255";
    const db = "store";
    return mongoose.connect(`mongodb://${user}:${pwd}@${url}/${db}`, db_options)
};





export {
    startDB,
    models
}