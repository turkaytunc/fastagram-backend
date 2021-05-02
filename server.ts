/* eslint-disable no-console */

import app from './src/app';

const { PORT = 4000 } = process.env;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
