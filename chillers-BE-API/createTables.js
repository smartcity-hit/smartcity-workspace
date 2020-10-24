const axios = require('axios');

const createTable = async () => {
  try {
    const res = await axios.post('http://localhost:3200/api/1/chillers/create', {
    host: "172.16.11.154",
    port: "502",
    unitId: "2"
    });
    if (res) {
      console.log(res);
    }
  } catch(err) {
    console.log(err);
  }

}

module.exports = createTable();