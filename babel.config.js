module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.', './'],

        alias: {
          '@src': './src',
          '@components': './src/components',
          '@styles': './global.css',
          '@navigation': './src/navigation',
          '@': './src',
        },

        extensions: ['.js', '.ts', '.tsx', '.jsx'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
