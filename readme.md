# Simple Brute

### Purpose of this module is to give a simple way of testing load on an API.

#### Usage

```
npm install simple-brute
```

```
var SimpleBrute = require('./simple-brute');

SimpleBrute._run('get', { url: "https://fed285ab.ngrok.io", repeat: 4, debug: true });

SAMPLE LOGS

ON ERROR
    Error On Request: 3,
    Reason: Error 502. Exiting!

ON SUCCESS
    Request: 10,
    DNS Lookup: 7.726604,
    TCP Connection: 386.382144,
    TLS Handshake: 658.416468,
    Content Transfer: 0.102445,
    First Byte: 204.53171,
    Total Request Time: 1257.159371
    ======================================================================
```

### TODO
* Add Tests
* Extend to pipe logs to file
* Use from commandline