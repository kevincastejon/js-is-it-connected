# is-it-connected

### Watch your internet connection

## Install
```
npm i is-it-connected
```

## Usage
```
const Watcher = require('is-it-connected');
const watch = new Watcher();
watch.on('online', () => {
  console.log('Connected.');
});
watch.on('offline', () => {
  console.log('Connection lost !');
});
watch.watch();
```

## API

- Members
  - connected (read-only) -   Boolean or null. Return your current connected status. True = connected. False = disconnected. null = undetermined because not watching.
  - timeout -                 Int. After this amount of ms of no response from urlTest the connection status will turn to false.
  - urlTest -                 String. The URL to join for testing connection.
  - waitingTime -             Int. The amount of ms it will wait between retrying to join the urlTest.

- Methods
  - constructor(urlTest = 'https://www.google.com', timeout = 5000, waitingTime = 5000)
    - urlTest -                 String. The URL to join for testing connection. Default 'https://www.google.com'.
    - timeout -                 Int. After this amount of ms of no response from urlTest the connection status will turn to false. Default 5000.
    - waitingTime -             Int. The amount of ms it will wait between retrying to join the urlTest. Default 5000.
  - watch() -                 Starts the connection monitoring and begin emitting events on status change
  - stopWatching() -          Stops the connection monitoring and does not emit anymore events

- Events
  - online -                  Emitted when the connection status goes to true.
  - offline -                 Emitted when the connection status goes to false.
