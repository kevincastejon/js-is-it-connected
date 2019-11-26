const IsItConnected = require('./index');
const isItConnected = new IsItConnected();
isItConnected.on('online', () => {
  console.log('Connected.');
});
isItConnected.on('offline', () => {
  console.log('Connection lost !');
});
isItConnected.watch();
