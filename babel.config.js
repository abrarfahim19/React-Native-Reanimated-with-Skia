module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '*': '.',
          '@root': './',
          '@src': './src',
          '@components': './src/components/',
          '@res': './src/res',
          '@containers': './src/containers',
          '@services': './src/services',
          '@utils': './src/utils',
          '@tsTypes': './src/types',
          '@global': './src/global',
          '@constants': './src/constants',
        },
      },
    ],
  'react-native-reanimated/plugin',
  ],
};
