module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['module:react-native-dotenv'], // Pour les variables d'environnement
    [
      'module-resolver', // Pour les alias
      {
        alias: {
          '@context': './src/context', // Alias pour le dossier context
          '@screens': './src/screens', // Alias pour le dossier screens
          '@components': './src/components', // Alias pour le dossier components
        },
      },
    ],
  ],
};