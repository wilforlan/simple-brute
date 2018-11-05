var Request = require('./request');
const nodeUrl = require('url')
require('./times').patch();
const chalk = require('chalk');
const log = console.log;

var SimpleBrute = (function() {
    
    var _Promises = [];

     /**
      * Executes query N number of times.
      * @function _run
      * @param {String} method 
      * @param {Object} opts 
      * @param {String} opts.url - The url to query, will be the same for all
      * @param {Number} opts.repeat - N Times to repeat this request
      * @param {boolean} opts.debug - Requires whether to show results on console.
      * @example
      * SimpleBrute._run('get', { url: "https://fed285ab.ngrok.io", repeat: 4, debug: false });
      */
    const _run = (method, opts) => {
        if (!opts) throw new Error("_run Options are required");
        const { url, headers, repeat, debug} = opts;
        if(opts && !repeat) throw new Error("No of times is required");

        repeat.times((i) => {
            (function(ii){
                var iii = ii + 1;
                if (debug) log(`Queued Request: ${chalk.yellow(iii)}`) ;
                _Promises.push(
                    new Promise(function(resolve, reject) {
                        Request(Object.assign(nodeUrl.parse(url), { headers, method }), (err, res) => {
                            if (!err) {
                                resolve(Object.assign(res, { index: iii }));
                            }else{
                                reject(Object.assign(err, { index: iii }));
                            }
                        })
                    }).catch(error => {
                        // The error might not neccesarily come from the first request, 
                        // it depends on how long it took the request to process.
                        if (debug) log(`
                            Error On Request: ${chalk.yellow(error.index)},
                            Reason: ${chalk.red(error.message)}
                        `);
                        // Cancel the current process
                        // return error;
                        process.exit(1);
                    })
                )
            })(i)
        });
        // Resolve all saved promises.
        Promise.all(_Promises).then(function(values) {
            if (debug) values.forEach( v => logOutput(v));
        });
    }

    const logOutput = (object) => {
        log(`
            Request: ${chalk.blue(object.index)},
            DNS Lookup: ${chalk.green(object.timings.dnsLookup)},
            TCP Connection: ${chalk.green(object.timings.tcpConnection)},
            TLS Handshake: ${chalk.green(object.timings.tlsHandshake)},
            Content Transfer: ${chalk.green(object.timings.contentTransfer)},
            First Byte: ${chalk.green(object.timings.firstByte)},
            Total Request Time: ${chalk.green(object.timings.total)}
            ======================================================================
        `)
    };

    return {
        _run
    }
})();

module.exports = SimpleBrute