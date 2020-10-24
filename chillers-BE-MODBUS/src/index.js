require('dotenv').config();
const app = require('./server');
const PORT = process.env.PORT || 3200;

const logger = require('./utils/logger');

app.listen(PORT, () => logger.info(`Server is up and running on port ${PORT}`));
