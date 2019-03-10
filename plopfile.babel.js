// plopfile.babel.js
'use strict';

const actionsToUseBasicTemplates = [
  {
    type: 'add',
    path: 'src/client/js/{{ filetype }}/{{ camelCase filename }}.js',
    templateFile: 'template/{{ filetype }}.hbs',
  },
  {
    type: 'add',
    path: 'src/client/js/{{ filetype }}/test/{{ camelCase filename }}.test.js',
    templateFile: 'template/{{ filetype }}.test.hbs',
  },
];

const actionsToCreateActionNetworking = [
  {
    type: 'add',
    path: 'src/client/js/{{ filetype }}/{{ camelCase filename }}.js',
    templateFile: 'template/actionNetworking.hbs',
  },
  {
    type: 'add',
    path: 'src/client/js/{{ filetype }}/test/{{ camelCase filename }}.test.js',
    templateFile: 'template/actionNetworking.test.hbs',
  },
];

const actionsToCreateReducerSwitchAction = [
  {
    type: 'modify',
    path: 'src/client/js/reducer/{{ camelCase filename }}.js',
    pattern: /(.*)(\/\/ -- PLOP_PREPEND_REDUCER_SWITCH_CASE --)\n/g,
    templateFile: 'template/reducerSwitchCase.hbs',
  },
  {
    type: 'modify',
    path: 'src/client/js/reducer/{{ camelCase filename }}.js',
    pattern: /(.*)(\/\/ -- PLOP_PREPEND_REDUCER_ACTION_HANDLER --)\n/g,
    templateFile: 'template/reducerActionHandler.hbs',
  },
  {
    type: 'modify',
    path: 'src/client/js/reducer/test/{{ camelCase filename }}.test.js',
    pattern: /(.*)(\/\/ -- PLOP_PREPEND_REDUCER_ACTION_TEST --)\n/g,
    templateFile: 'template/reducerActionTest.hbs',
  },
  {
    type: 'modify',
    path: 'src/client/js/reducer/{{ camelCase filename }}.js',
    pattern: /(.*)(\/\/ -- PLOP_PREPEND_REDUCER_ACTION_TYPE --)/g,
    template: '$1{{ constantCase actionType }},\n$1$2',
  },
  {
    type: 'modify',
    path: 'src/client/js/reducer/test/{{ camelCase filename }}.test.js',
    pattern: /(.*)(\/\/ -- PLOP_PREPEND_REDUCER_ACTION_TYPE --)/g,
    template: '$1{{ constantCase actionType }},\n$1$2',
  },
];

const plopHandler = plop => {
  plop.setHelper('removeXetter', text => text.replace(/^[gs]et /i, ''));
  plop.setHelper('addBigParantheses', text => `{${text}}`);

  plop.setGenerator('selector', {
    description: 're-reselect file in src/client/js/selector',
    prompts: [
      {
        type: 'input',
        name: 'filename',
        message: 'selector name:',
      },
      {
        type: 'input',
        name: 'key',
        message: 'select by:',
      },
    ],
    actions: [
      ...actionsToUseBasicTemplates.map(action => ({
        ...action,
        data: { filetype: 'selector' },
      })),
    ],
  });

  plop.setGenerator('action', {
    description: 'action file in src/client/js/action',
    prompts: [
      {
        type: 'input',
        name: 'filename',
        message: 'action name:',
      },
      {
        type: 'input',
        name: 'firstParam',
        message: 'Name of first param:',
      },
      {
        type: 'input',
        name: 'actionType',
        message: 'Name of first action type:',
      },
    ],
    actions: [
      ...actionsToUseBasicTemplates.map(action => ({
        ...action,
        data: { filetype: 'action' },
      })),
    ],
  });

  plop.setGenerator('actionNetworking', {
    description: 'action with api call file in src/client/js/action',
    prompts: [
      {
        type: 'input',
        name: 'filename',
        message: 'action name:',
      },
      {
        type: 'input',
        name: 'firstParam',
        message: 'Name of first param:',
      },
      {
        type: 'input',
        name: 'actionType',
        message: 'Name of first action type:',
      },
      {
        type: 'input',
        name: 'endPoint',
        message: 'Name of RESTful API endPoint:',
      },
      {
        type: 'confirm',
        name: 'needToken',
        message: 'Should api need token?',
      },
    ],
    actions: [
      ...actionsToCreateActionNetworking.map(action => ({
        ...action,
        data: { filetype: 'action' },
      })),
    ],
  });

  plop.setGenerator('component', {
    description: 'component file in src/client/js/component',
    prompts: [
      {
        type: 'input',
        name: 'filename',
        message: 'component name:',
      },
      {
        type: 'input',
        name: 'firstProp',
        message: 'Name of first prop:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/client/js/component/{{ properCase filename }}.jsx',
        templateFile: 'template/component.hbs',
      },
      {
        type: 'add',
        path: 'src/client/js/component/test/{{ properCase filename }}.test.js',
        templateFile: 'template/component.test.hbs',
      },
    ],
  });

  plop.setGenerator('reducer', {
    description: 'reducer file in src/client/js/reducer',
    prompts: [
      {
        type: 'input',
        name: 'filename',
        message: 'reducer name:',
      },
      {
        type: 'input',
        name: 'actionType',
        message: 'Name of first action type:',
      },
    ],
    actions: [
      ...actionsToUseBasicTemplates.map(action => ({
        ...action,
        data: { filetype: 'reducer' },
      })),
      ...actionsToCreateReducerSwitchAction,
      {
        type: 'modify',
        path: 'src/client/js/reducer/reducer.js',
        pattern: /(.*)(\/\/ -- PLOP_PREPEND_REDUCER_IMPORT --)/g,
        template:
          "import {{ camelCase filename }} from './{{ camelCase filename }}.js';\n$1$2",
        force: true,
      },
      {
        type: 'modify',
        path: 'src/client/js/reducer/reducer.js',
        pattern: /(.*)(\/\/ -- PLOP_PREPEND_REDUCER --)/g,
        template: '$1{{ camelCase filename }},\n$1$2',
        force: true,
      },
    ],
  });

  plop.setGenerator('reducerAction', {
    description: 'reducer switch action',
    prompts: [
      {
        type: 'input',
        name: 'filename',
        message: 'reducer name:',
      },
      {
        type: 'input',
        name: 'actionType',
        message: 'Name of action type:',
      },
    ],
    actions: [...actionsToCreateReducerSwitchAction],
  });
};

module.exports = plopHandler;
