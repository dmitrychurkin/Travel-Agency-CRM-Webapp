import * as mongoose from "mongoose";
import Config from "../serverConfig";

export class MongoDB {
    static get DatabaseConnectionOptions(){
        return {
            promiseLibrary: global.Promise,
            server: {
                reconnectTries: Number.MAX_VALUE
            }
        };
    }
    static configureAndCreate(dbURL = Config.MONGOLAB_URI) {
        const endPointDbURI = process.env.MONGOLAB_URI ||
                            process.env.MONGOHQ_URL ||
                            dbURL;
        return new MongoDB(endPointDbURI);
    }
    private constructor(endPointDbURI: string) {
        // const mongoose = new Mongoose();
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(endPointDbURI, MongoDB.DatabaseConnectionOptions)
                .then(() => console.log("Connected to DB"))
                .catch( (err: any) => (console.log("Error occured, while connecting to DB"), console.error(err) ));
    }
}