import express, { Request, Response } from 'express';
import  connectDB  from './config/db';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

//Routes
import userRoutes from './controller/user';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/fapi',userRoutes)


const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(PORT, async() => {
  try {
    await connectDB();
  } catch (error) {
    console.log("Something went wrong")
  }
  console.log(`Server is running on port ${PORT}`);
});
