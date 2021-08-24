
pkg.initGettext();
pkg.initFormat();
pkg.require({
  'Gio': '2.0',
  'Gtk': '3.0'
});

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const Window = imports.window;

function main(argv) {

  let app = new Gtk.Application({
      application_id: 'org.gnome.Note-App',
      flags: Gio.ApplicationFlags.FLAGS_NONE,
  });

  app.connect('activate', app => {
      let win = app.active_window;

      if (!win)
          win = new Window.NoteAppWindow(app);

      win.present();
  });

  return app.run(argv);
}
