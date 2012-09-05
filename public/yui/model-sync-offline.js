YUI.add('model-sync-local', function(Y) {

function LocalSync() {}
LocalSync._data = {};

LocalSync.prototype = {
 
    root: '',

 
    storage: null,

    // -- Lifecycle Methods -----------------------------------------------------
    initializer: function (config) {
        var store;

        config || (config = {});

        if ('root' in config) {
            this.root = config.root || '';
        }

        try {
            this.storage = Y.config.win.localStorage;
            store = this.storage.getItem(this.root);
        } catch (e) {
        }
        
        // Pull in existing data from localStorage, if possible
        LocalSync._data[this.root] = (store && Y.JSON.parse(store)) || {};
    },

 
    generateID: function (pre) {
        return Y.guid(pre + '_');
    },
    
 
    sync: function (action, options, callback) {
        options || (options = {});
        var response;

        switch (action) {
            case 'read':
                if (this._isYUIModelList) {
                    response = this._index(options);
                } else {
                    response = this._show(options);
                }
                break;
            case 'create':
                response = this._create(options);
                break;
            case 'update':
                response = this._update(options);
                break;
            case 'delete':
                response = this._destroy(options);
                break;
        }

        if (response) {
            callback(null, response);
        } else {
            callback('Data not found');
        }
    },
     
    _index: function (options) {
        return Y.Object.values(LocalSync._data[this.root]);
    },

 
    _show: function (options) {
        return LocalSync._data[this.root][this.get('id')];
    },
    
 
    _create: function (options) {
        var hash = this.toJSON();
        hash.id = this.generateID(this.root);
        LocalSync._data[this.root][hash.id] = hash;

        this._save();
        return hash;
    },

 
    _update: function (options) {
        var hash = Y.merge(this.toJSON(), options);
        LocalSync._data[this.root][this.get('id')] = hash;
        
        this._save();
        return hash;
    },

 
    _destroy: function (options) {
        delete LocalSync._data[this.root][this.get('id')];
        this._save();
        return this.toJSON();
    },
    
 
    _save: function () {
        this.storage && this.storage.setItem(
            this.root,
            Y.JSON.stringify(LocalSync._data[this.root])
        );
    }
};

// -- Namespace ---------------------------------------------------------------

Y.namespace('ModelSync').Local = LocalSync;


}, 'gallery-2012.08.29-20-10' ,{requires:['model', 'model-list', 'io-base', 'json-stringify'], skinnable:false});