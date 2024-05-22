
import { server } from "./app.js";



const startServer = () => {
  server.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
  });
};





startServer();