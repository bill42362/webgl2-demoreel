// wiki.js
'use strict';
import fs from 'fs';
import doc from 'jsdoc-to-markdown';

const templateData = doc.getTemplateDataSync({
  files: 'src/client/js/**/*.js',
});
const renderConfig = {
  partial: 'template/partial/*.hbs',
  helper: 'template/helper.js',
};

const reducerTemplate = fs.readFileSync('template/reducer-wiki.hbs', 'utf-8');
const reducerWiki = doc.renderSync({
  ...renderConfig,
  data: templateData,
  template: reducerTemplate,
});
fs.writeFileSync('../swag-webapp.wiki/Reducers.md', reducerWiki, 'utf-8');

const actionTemplate = fs.readFileSync('template/action-wiki.hbs', 'utf-8');
const actionWiki = doc.renderSync({
  ...renderConfig,
  data: templateData,
  template: actionTemplate,
});
fs.writeFileSync('../swag-webapp.wiki/Actions.md', actionWiki, 'utf-8');

const selectorTemplate = fs.readFileSync('template/selector-wiki.hbs', 'utf-8');
const selectorWiki = doc.renderSync({
  ...renderConfig,
  data: templateData,
  template: selectorTemplate,
});
fs.writeFileSync('../swag-webapp.wiki/Selectors.md', selectorWiki, 'utf-8');
