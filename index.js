const fetch = require('node-fetch');
const events = require('events');

class IsItConnected extends events {
  constructor() {
    super();
    this.connected = false;
  }
  watch() {
    this.testConnection().then(() => {
      if (!this.connected) {
        this.connected = true;
        this.emit('online');
      }
      this.watch();
    }).catch(() => {
      if (this.connected) {
        this.connected = false;
        this.emit('offline');
      }
      this.watch();
    })
  }
  testConnection() {
    return(new Promise((res,rej) => {
      fetch('https://www.google.com').then((data) => {
        res()
      }).catch((err) => {
        rej()
      });
    }))
  }
}
module.exports = new IsItConnected()
