YUI.add('offline-sync', function(Y) {

    var OfflineSync = function(){

        sync: function (action, options, callback) {
            var data;

            switch (action) {
                case 'create':
                    data = this.toJSON();
 
                    data.id = Y.Lang.now();
 
                    localStorage.setItem(data.id, Y.JSON.stringify(data));
                    callback(null, data);
                    return;

                case 'read': 
                    data = localStorage.getItem(this.get('id'));

                    if (data) {
                        callback(null, data);
                    } else {
                        callback('Model not found.');
                    }

                    return;

                case 'update':
                    data = this.toJSON();
 
                    localStorage.setItem(this.get('id'), Y.JSON.stringify(data));
                    callback(null, data);
                    return;

                case 'delete':
                    localStorage.removeItem(this.get('id'));
                    callback();
                    return;

                default:
                    callback('Invalid action');
            }
        }
    }
    Y.namespace('ModelSync').Offline = OfflineSync;

}, '0.0.1' ,{ requires:['model', 'json-stringify']});