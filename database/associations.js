var Sequelize = require('sequelize');
var CardTemplates = require('./models/cardTemplates.js');
var Themes = require('./models/themes.js');
var TemplateThemes = require('./models/templateThemes.js');
var UserCards = require('./models/userCards.js');
var SentCards = require('./models/sentCards.js');

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

CardTemplates.hasMany(UserCards, {
  foreignKey: 'templateId'
});

UserCards.belongsTo(CardTemplates, {
  foreignKey: 'templateId'
});

UserCards.hasMany(SentCards, {
  foreignKey: 'cardId'
});

SentCards.belongsTo(UserCards, {
  foreignKey: 'cardId'
});