module.exports = {
  root: true,
  extends: [
    'airbnb',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  env: {
    jest: true,
  },
  plugins: ['react', 'react-native', '@typescript-eslint'],
  rules: {
    // Add or modify rules based on your project's specific requirements
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx', '.tsx']}],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
