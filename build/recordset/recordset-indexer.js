YUI.add('recordset-indexer', function(Y) {


function RecordsetIndexer(config) {
    RecordsetIndexer.superclass.constructor.apply(this, arguments);
}

Y.mix(RecordsetIndexer, {
    NS: "indexer",

    NAME: "recordsetIndexer",

    ATTRS: {
		hashTables: {
				value: {
					
				}
			},
			
			keys: {
				value: {
					
				}
			}
    }
});


Y.extend(RecordsetIndexer, Y.Plugin.Base, {
    initializer: function(config) {
       var host = this.get('host');
       
       	//setup listeners on recordset events
       	this.onHostEvent('add', Y.bind("_defAddHash", this), host);
       	this.onHostEvent('remove', Y.bind('_defRemoveHash', this), host);
       	this.onHostEvent('update', Y.bind('_defUpdateHash', this), host);	
       	//this.publish('hashKeyUpdate', {defaultFn:Y.bind('_defUpdateHashTable', this)});
       		
       	//create initial hash
       	//this.set('key', config.key || 'id');
    },

    destructor: function(config) {
    },

	_setHashTable: function(key) {
		var host = this.get('host'), obj = {}, i=0, len = host.getLength();
		
		for (; i<len; i++) {
			obj[host._items[i].getValue(key)] = host._items[i];
		}
		return obj;
	},

	createTable: function(key) {
		var tbls = this.get('hashTables');
		tbls[key] = this._setHashTable(key);
		this.set('hashTables', tbls);
		
		return tbls[key];
	},
	
	getTable: function(key) {
		return this.get('hashTables')[key];
	},
	
	_defAddHash: function(e) {
		var tbl = this.get('hashTables');
		
		
		//Go through every hashtable that is stored.
		//in each hashtable, look to see if the key is represented in the object being added.
		Y.each(tbl, function(v,key) {
			Y.each(e.added, function(o) {
				//if the object being added has a key which is being stored by hashtable v, add it into the table.
				if (o.getValue(key)) {
					v[o.getValue(key)] = o;
				}
			});
		});
		
	},
	
	_defRemoveHash: function(e) {
		var tbl = this.get('hashTables'), reckey;
		
		//Go through every hashtable that is stored.
		//in each hashtable, look to see if the key is represented in the object being deleted.
		Y.each(tbl, function(v,key){
			Y.each(e.removed, function(o) {
				reckey = o.getValue(key);
				
				//if the hashtable has a key storing a record, and the key and the record both match the record being deleted, delete that row from the hashtable
				if (v[reckey] == o) {
					delete v[reckey];
				}
			});
		}); 
	}
	
	// _defUpdateHash: function(e) {
	// 	var tbl = this.get('hashTables'), reckey, updated;
	// 	
	// 	Y.each(tbl, function(v, key) {
	// 		Y.each(e.updated, function(o, i) {
	// 			
	// 			//delete record from hashtable if it has been overwritten
	// 			reckey = o.getValue(key);
	// 			
	// 			if (e.overwritten[i]) {
	// 				overwritten = e.overwritten[i];
	// 			}
	// 			
	// 			if (reckey) {
	// 				v[reckey] = o;
	// 			}
	// 			
	// 			//the undefined case is if more records are updated than currently exist in the recordset. 
	// 			if ((Y.Lang.isValue(overwritten)) && (v[overwritten.getValue(key)] == overwritten)) {
	// 				delete v[overwritten.getValue(key)];
	// 			}
	// 			
	// 							// 
	// 							// 
	// 							// if (v[reckey] == o) {
	// 							// 	delete v[reckey];
	// 							// }
	// 							// 
	// 							// //add the new updated record if it has a key that corresponds to a hash table
	// 							// if (updated.getValue(key)) {
	// 							// 	v[updated.getValue(key)] = updated;
	// 							// }
	// 							// 
	// 		});
	// 	});
	// }
	

	// _setHashKey: function(k) {
	// 	this.fire('hashKeyUpdate', {key:k});
	// 	return k;
	// },
	// 
	// _defUpdateHashTable: function(e) {
	// 	var host = this.get('host'), obj = {}, key=e.key, i=0, len=host.getLength();
	// 	
	// 	for (; i<len; i++) {
	// 		obj[host._items[i].getValue(key)] = host._items[i];
	// 	}
	// 	this.set('table', obj);
	// },
	// 
	// _defAddHash: function(e) {
	// 	var obj = this.get('table'), key = this.get('key'), i=0;
	// 	for (; i<e.added.length; i++) {
	// 		obj[e.added[i].getValue(key)] = e.added[i];			
	// 	}
	// 	this.set('table', obj);
	// },
	// 
	// _defRemoveHash: function(e) {
	// 	var obj = this.get('table'), key = this.get('key'), i=0;
	// 	for (; i<e.removed.length; i++) {
	// 		delete obj[e.removed[i].getValue(key)];
	// 	}
	// 	this.set('table', obj);
	// },
	// 
	// _defUpdateHash: function(e) {
	// 	var obj = this.get('table'), key = this.get('key'), i=0;
	// 	
	// 	//deletes the object key that held on to an overwritten record and
	// 	//creates an object key to hold on to the updated record
	// 	for (; i < e.updated.length; i++) {
	// 		delete obj[e.overwritten[i].get(key)];
	// 		obj[e.updated[i].getValue(key)] = e.updated[i]; 
	// 	}
	// 	this.set('table', obj);
	// }
	
	
});
Y.namespace("Plugin").RecordsetIndexer = RecordsetIndexer;



}, '@VERSION@' ,{requires:['recordset-base','plugin']});
