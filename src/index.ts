import app from './app';
require('./dotenv');

const PORT = process.env.PORT || 6789;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
