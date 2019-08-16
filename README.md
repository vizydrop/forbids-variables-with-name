# forbids-variables-with-name

Stylelint rule forbids the use of variables with a specific name.

## Usage

Add it to your stylelint config `plugins` array, then add `"@vizydrop/stylelint-forbids-variables-with-name"` to your rules,
specifying the variables which you want to check.

Like so:

```js
// .stylelintrc
{
  "plugins": [
    "@vizydrop/stylelint-forbids-variables-with-name"
  ],
  "rules": {
    // ...
    "vizydrop/stylelint-forbids-variables-with-name": {
        forbiddenNames: [`@exactForbiddenTextColor`, `/@regEpx.+Color/`],
        ignoreNames: ['@exactForbiddenColor', '/^@regEpx.+Color$/'],
    }
    // ...
  }
}
```
