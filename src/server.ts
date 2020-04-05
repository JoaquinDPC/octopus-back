import app from "./app";
import { PORT } from "./constants/TypistConstants";

app.listen(PORT, () => console.log(`Listening on di port port ${PORT}`));
