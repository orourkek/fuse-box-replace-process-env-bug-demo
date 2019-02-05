const { FuseBox, WebIndexPlugin, QuantumPlugin } = require('fuse-box');
const { src, task, context } = require('fuse-box/sparky');

context(
  class {
    getConfig() {
      return FuseBox.init({
        homeDir: 'src',
        output: 'dist/$name.js',
        target: 'browser@es5',
        hash: false,
        plugins: [
          WebIndexPlugin(),
          QuantumPlugin({
            bakeApiIntoBundle: 'app',
            uglify: false,
            extendServerImport: true
          })
        ]
      });
    }
    createBundle(fuse) {
      const app = fuse.bundle('app');
      app.instructions('> index.ts');
      return app;
    }
  }
);

task('clean', () => src('dist').clean('dist').exec());

task('default', ['clean'], async (context) => {
  const fuse = context.getConfig();
  context.createBundle(fuse);
  await fuse.run();
});
