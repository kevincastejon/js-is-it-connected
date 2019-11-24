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
      setTimeout(() => {
        this.watch();
      }, 5000);
    }).catch(() => {
      if (this.connected) {
        this.connected = false;
        this.emit('offline');
      }
      setTimeout(() => {
        this.watch();
      }, 5000);
    })
  }
  testConnection() {
    return(new Promise((res,rej) => {
      fetch('https://www.google.com',{timeout:5000}).then((data) => {
        res()
      }).catch((err) => {
        rej()
      });
    }))
  }
}
module.exports = new IsItConnected()
// const iic = new IsItConnected();
// iic.on('online', () => {
//   console.log('online');
// });
// iic.off('offline', () => {
//   console.log('offline');
// });
// iic.watch()
