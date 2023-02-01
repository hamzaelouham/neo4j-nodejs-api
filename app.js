const express = require("express");
const cors = require("cors");

class App {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    // this.route = express.Router();
    this.app.listen(this.port, () => {
      console.log(` app listening on port ${this.port}`);
    });
  }
}

module.exports = App;
