var Sequelize = require('sequelize');
var CardTemplates = require('./models/cardTemplates.js');
var Themes = require('./models/themes.js');
var TemplateThemes = require('./models/templateThemes.js');

Themes.belongsToMany(CardTemplates, {
  through: {
    model: TemplateThemes
  },
  foreignKey: 'themeId'
});

CardTemplates.belongsToMany(Themes, {
  through: {
    model: TemplateThemes
  },
  foreignKey: 'templateId'
});