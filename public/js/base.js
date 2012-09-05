(function() {
    var hasOwn   = Object.prototype.hasOwnProperty,
        base = window.base = {
        merge : function(){
            var args   = arguments,
                i      = 0,
                len    = args.length,
                result = {};
             
                for (; i < len; ++i) {
                    base.mix(result, args[i]);
                }
             
            return result;
        },
        mix : function(receiver, supplier) {
            var from,   key,  to;

            from = supplier;
            to   = receiver;
 

            for (key in from) {
                if (!hasOwn.call(from, key)) {
                    continue;
                } 
                to[key] = from[key];
            }
            return receiver;
        }


    }
})();