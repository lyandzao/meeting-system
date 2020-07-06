const {
  override,
  addWebpackAlias,
  overrideDevServer,
  fixBabelImports,
  disableEsLint,
  addBundleVisualizer,
  addWebpackPlugin,
  addBabelPlugin
} = require('customize-cra');
const SpeedMeasure = require('speed-measure-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const path = require('path');

const appPath = target => path.resolve(__dirname, target);
const devServerConfig = () => config => {
  return {
    ...config,
    compress: true,
    proxy: {
      '/meeting/**': {
        target: 'http://www.ljhhhx.com:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/meeting': '/meeting'
        }
      }
    }
  }
}

module.exports = {
  webpack: override(
    (config, env) => {
      config = rewireReactHotLoader(config, env)
      return config
    },
    addWebpackAlias({
      '@': appPath('src'),
      '~': appPath('src/assets')
    }),
    disableEsLint(),
    // addBundleVisualizer(),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    // addWebpackPlugin(new HardSourceWebpackPlugin())
  ),
  devServer: overrideDevServer(
    devServerConfig()
  ),
  paths: (paths, env) => {
    return paths;
  }
};