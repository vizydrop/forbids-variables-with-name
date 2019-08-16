const testRule = require('stylelint-test-rule-tape');
const forbidsVariablesWithName = require('./index');

testRule(forbidsVariablesWithName.rule, {
  ruleName: forbidsVariablesWithName.ruleName,
  config: {
    forbiddenNames: [`@textColor`, `/@.+Color/`],
    ignoreNames: ['/^@button.+Color$/', '@exactColor'],
  },
  accept: [
    { code: '.selector {background: var(--testColor);}' },
    { code: '.selector {font-size: @fontSize;}' },
    { code: '.selector {color: @buttonSomeColor;}' },
    { code: '.selector {color: @exactColor;}' },
  ],

  reject: [
    {
      code: '.selector {background: @textColor;}',
      message:
        '"@textColor" variable forbidden please use custom css properties instead (vizydrop/stylelint-forbids-variables-with-name)',
      line: 1,
      column: 12,
    },
    {
      code: '.selector {background: @bgColor;}',
      message:
        '"@bgColor" variable forbidden please use custom css properties instead (vizydrop/stylelint-forbids-variables-with-name)',
      line: 1,
      column: 12,
    },
  ],
});
