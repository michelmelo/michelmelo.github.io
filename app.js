/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'HnGroup.Application',

    name: 'HnGroup',

    requires: [
        // This will automatically load all classes in the HnGroup namespace
        // so that application classes do not need to require each other.
        'HnGroup.*'
    ],

    // The name of the initial view to create.
    mainView: 'HnGroup.view.main.Main'
});
