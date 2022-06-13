import mongoose, { ConnectOptions } from 'mongoose';
import express from 'express';
import  {routes} from './routes/api';
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoOptions = {
 useNewUrlParser: true,
  useUnifiedTopology: true
}
app.use(routes);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectOptions);


// Use this to log mongo queries being executed!
mongoose.set('debug', true);
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
