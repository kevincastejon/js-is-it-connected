const Watcher = require('./index');
const watcher = new Watcher();
watcher.on('online', () => {
  console.log('Connected.');
});
watcher.on('offline', () => {
  console.log('Connection lost !');
});
watcher.watch();
