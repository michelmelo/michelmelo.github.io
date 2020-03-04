Ext.Microloader.setManifest({
	"packages": {
		"cmd": {
			"current": "6.2.0.103",
			"version": "6.2.0.103"
		},
		"core": {
			"alternateName": ["sencha-core"],
			"creator": "Sencha",
			"type": "code",
			"version": "6.2.0.981"
		},
		"ext": {
			"build": {
				"dir": "${package.output.base}"
			},
			"creator": "Sencha",
			"license": "dev",
			"namespace": "Ext",
			"resource": {
				"paths": ["resources"]
			},
			"type": "framework",
			"version": "6.2.0.981"
		},
		"font-awesome": {
			"creator": "Sencha",
			"namespace": "Ext",
			"resource": {
				"paths": ""
			},
			"theme": "theme-neptune",
			"toolkit": "classic",
			"type": "code",
			"version": "6.2.0.981"
		},
		"font-ext": {
			"creator": "Sencha",
			"namespace": "Ext",
			"theme": "theme-neptune",
			"toolkit": "classic",
			"type": "code",
			"version": "6.2.0.981"
		},
		"font-pictos": {
			"creator": "Sencha",
			"namespace": "Ext",
			"theme": "theme-neptune",
			"toolkit": "classic",
			"type": "code",
			"version": "6.2.0.981"
		},
		"google": {
			"alternateName": ["ext-google"],
			"creator": "Sencha",
			"namespace": "Ext",
			"resource": {
				"paths": ["${package.dir}/resources", "${package.dir}/modern/resources"]
			},
			"type": "code",
			"version": "6.2.0.981"
		},
		"modern": {
			"build": {
				"dir": "${package.output}"
			},
			"creator": "Sencha",
			"namespace": "Ext",
			"type": "toolkit",
			"version": "6.2.0.981"
		},
		"theme-base": {
			"creator": "Sencha",
			"namespace": "Ext",
			"toolkit": "modern",
			"type": "theme",
			"version": "6.2.0.981"
		},
		"theme-neptune": {
			"creator": "Sencha",
			"extend": "theme-base",
			"namespace": "Ext",
			"toolkit": "modern",
			"type": "theme",
			"version": "6.2.0.981"
		},
		"theme-triton": {
			"creator": "Sencha",
			"extend": "theme-neptune",
			"namespace": "Ext",
			"resource": {
				"paths": ""
			},
			"toolkit": "modern",
			"type": "theme",
			"version": "6.2.0.981"
		},
		"ux": {
			"alternateName": ["ext-ux"],
			"creator": "Sencha",
			"namespace": "Ext",
			"resource": {
				"paths": ["${package.dir}/resources", "${package.dir}/modern/resources"]
			},
			"type": "code",
			"version": "6.2.0.981"
		}
	},
	"js": [{
		"path": "modern/app.js"
	}],
	"css": [{
		"exclude": ["fashion"],
		"isSdk": true,
		"path": "modern/resources/FeedViewer-all.css"
	}],
	"cache": {
		"enable": false,
		"deltas": true
	},
	"fashion": {
		"inliner": {
			"enable": false
		}
	},
	"name": "FeedViewer",
	"version": "6.0.2",
	"framework": "ext",
	
	"resource": {
		"paths": ["resources", "modern/resources"]
	},
	"id": "6569ca19-7571-4938-8136-7514b89ef07b",
	"toolkit": "modern",
	"theme": "theme-triton",
	"profile": "modern",
	"hash": "69d04c444d51bcc7e0bf951cb736cd3b3c4f2e0e",
	"resources": {
		"path": "modern/resources",
		"shared": "resources"
	}
});