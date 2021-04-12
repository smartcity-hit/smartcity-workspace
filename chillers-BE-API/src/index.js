require('dotenv').config();
const app = require('./server');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => logger.info(`Server is up and running on port ${PORT}`));
