
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

var NoteAppWindow = new Lang.Class({
    Name: 'NoteAppWindow',
    GTypeName: 'NoteAppWindow',
    Extends: Gtk.ApplicationWindow,
    Template: 'resource:///org/gnome/Note-App/window.ui',
    InternalChildren: ['label'],

    _init(application) {
        this.parent({
            application,
        });
    },
});

