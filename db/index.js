const neo4j = require("neo4j-driver");

class DB {
  constructor(uri) {
    this.uri = uri;
    this.driver = neo4j.driver(this.uri);
  }

  getSession() {
    return this.driver.session();
  }
  run(query) {
    return this.driver.session().run(query);
  }
  close() {
    return this.driver.session().close();
  }
  destroy() {
    return this.driver.close();
  }
}

module.exports = DB;
