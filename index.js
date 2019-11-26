const fetch = require('node-fetch');
const events = require('events');

class IsItConnected extends events {
  constructor(urlTest = 'https://www.google.com', timeout = 5000, waitingTime = 5000) {
    super();
    this._connected = null;
    this._timeout = timeout;
    this._urlTest = urlTest;
    this._waitingTime = waitingTime;
    this._watching = false;
  }
  get connected() {
    return(this._connected);
  }
  get timeout() {
    return(this._timeout);
  }
  get urlTest() {
    return(this._urlTest);
  }
  get waitingTime() {
    return(this._waitingTime);
  }
  set timeout(value) {
    this._timeout = value;
  }
  set urlTest(value) {
    this._urlTest = value;
  }
  set waitingTime(value) {
    this._waitingTime = value;
  }
  get watching() {
    return(this._watching);
  }
  watch() {
    if (!this._watching) {
      this._watch();
    } else {
      console.log('Already watching !');
    }
  }
  _watch(){
      this._watching = true;
      this._testConnection().then(() => {
        if (!this._connected && this._watching) {
          this._connected = true;
          this.emit('online');
        }
        if (this._watching) {
          setTimeout(() => {
            if (this._watching) {
              this._watch();
            }
          }, this._waitingTime);
        }
      }).catch(() => {
        if ((this._connected === null || this._connected) && this._watching) {
          this._connected = false;
          this.emit('offline');
        }
        if (this._watching) {
          setTimeout(() => {
            if (this._watching) {
              this._watch();
            }
          }, this._waitingTime);
        }
      });

  }
  stopWatching(){
    if (this._watching) {
      this._watching = false;
      this._connected = null;
    } else {
      console.log('Not watching !');
    }
  }
  _testConnection() {
    return(new Promise((res,rej) => {
      fetch(this._urlTest,{timeout:this._timeout}).then((data) => {
        res()
      }).catch((err) => {
        rej()
      });
    }))
  }
}
module.exports = IsItConnected;
