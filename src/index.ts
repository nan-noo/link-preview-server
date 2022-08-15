import app from './app';

const PORT = process.env.PORT || 5678;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
