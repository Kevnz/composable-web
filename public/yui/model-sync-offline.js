YUI.add('offline-sync', function(Y) {

    var OfflineSync = function(){}

    OfflineSync.prototype = {
        sync: function (action, options, callback) {
            var data;

            switch (action) {
                case 'create':
                    Y.log('create');
                    data = this.toJSON();
 
                    data.id = Y.Lang.now();
 
                    localStorage.setItem(data.id, Y.JSON.stringify(data));
                    callback(null, data);
                    return;

                case 'read': 
                    Y.log('read');
                    Y.log(this.get('id'));
                    data = localStorage.getItem(this.get('id'));
                    Y.log(this);
                    if (data) {
                        callback(null, data);
                    } else {
                        callback('Model not found.');
                    }

                    return;

                case 'update':
                    Y.log('update');
                    data = this.toJSON();
 
                    localStorage.setItem(this.get('id'), Y.JSON.stringify(data));
                    callback(null, data);
                    return;

                case 'delete':
                    localStorage.removeItem(this.get('id'));
                    callback();
                    return;

                default:
                    Y.log('default');
                    callback('Invalid action');
            }
        }
    }
    Y.namespace('ModelSync').Offline = OfflineSync;

}, '0.0.1' ,{ requires:['model', 'json-stringify']});