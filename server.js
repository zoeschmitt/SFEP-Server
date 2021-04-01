import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';

DB_URL = 'mongodb+srv://zoe:F7vHwnL5iBjd@sfep-db.t6rsu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();
const port = process.env.port || 8000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', routes);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

var database;

(async () => {
    try {
        database = await mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true});
        database ? console.log('Successfully connected to db\n') : console.log('Error connecting to db\n');
    } catch (e) {
        console.log(`Could not connect to db: ${e}`);
    }
})();

export default app;