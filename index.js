const stylelint = require('stylelint');
const ruleName = 'vizydrop/stylelint-forbids-variables-with-name';
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected(value) {
    return `"${value}" variable forbidden please use custom css properties instead`;
  },
});

/**
 * Returns boolean wether a string should be parsed as regex or not
 *
 * @param  {string} string
 * @return {bool}
 */
function isStringRegex(string) {
  return string[0] === '/' && string[string.length - 1] === '/';
}

/**
 * Returns RegExp object for string like "/reg/"
 *
 * @param  {string} string
 * @return {RegExp}
 */
function toRegex(string) {
  return new RegExp(string.slice(1, -1));
}

const ignorePredicate = (skipNames, value) => {
  return Boolean(
    skipNames.find((name) => {
      if (isStringRegex(name)) {
        const regExp = toRegex(name);
        return regExp.test(value);
      }
      return value.includes(name);
    })
  );
};

const forbiddenPredicate = (forbiddenNames, value) => {
  return forbiddenNames.find((name) => {
    if (isStringRegex(name)) {
      const regExp = toRegex(name);
      return regExp.test(value);
    }
    return value.includes(name);
  });
};

module.exports = stylelint.createPlugin(ruleName, function({
  forbiddenNames = [],
  ignoreNames = [],
}) {
  return function(postcssRoot, postcssResult) {
    if (forbiddenNames.length === 0) {
      return;
    }
    postcssRoot.walkDecls((decl) => {
      const value = decl.value;
      const skip = ignorePredicate(ignoreNames, value);
      const forbid = forbiddenPredicate(forbiddenNames, value);
      if (skip === false && forbid) {
        stylelint.utils.report({
          ruleName: ruleName,
          result: postcssResult,
          node: decl,
          message: messages.expected(decl.value),
          line: decl.line,
          column: decl.column,
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
