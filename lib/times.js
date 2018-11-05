// uh-oh sorry patching prototypes :)

module.exports = (function(){
    
    var timesFunction = function(callback) {
        if (typeof callback !== "function" ) {
            throw new TypeError("Callback is not a function");
        } else if( isNaN(parseInt(Number(this.valueOf()))) ) {
            throw new TypeError("Object is not a valid number");
        }
        for (var i = 0; i < Number(this.valueOf()); i++) {
            callback(i);
        }
    };
    
    const patch = () => {
        String.prototype.times = timesFunction;
        Number.prototype.times = timesFunction;
    }

    return {
        patch
    }
})();