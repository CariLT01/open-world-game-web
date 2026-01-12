const path = require('path');

module.exports = {
  mode: 'development', // change to 'production' for production build
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'], // allows importing without specifying extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  cache: {
    type: 'filesystem', // enables persistent caching to disk
    buildDependencies: {
      config: [__filename], // invalidates cache if this config file changes
    },
  },
};
