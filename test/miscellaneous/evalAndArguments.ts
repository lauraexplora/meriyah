import { Context } from '../../src/common';
import * as t from 'assert';
import { parseSource } from '../../src/parser';

describe('Miscellaneous - Eval and arguments', () => {
  for (const arg of [
    'arguments--;',
    '{ eval }',
    '{ arguments }',
    '{ foo: eval }',
    '{ foo: arguments }',
    '{ eval = 0 }',
    '{ arguments = 0 }',
    '{ foo: eval = 0 }',
    '{ foo: arguments = 0 }',
    '[ eval ]',
    '[ arguments ]',
    '[ eval = 0 ]',
    '[ arguments = 0 ]',
    '{ x: (eval) }',
    '{ x: (arguments) }',
    '{ x: (eval = 0) }',
    '{ x: (arguments = 0) }',
    '{ x: (eval) = 0 }',
    '{ x: (arguments) = 0 }',
    '[ (eval) ]',
    '[ (arguments) ]',
    '[ (eval = 0) ]',
    '[ (arguments = 0) ]',
    '[ (eval) = 0 ]',
    '[ (arguments) = 0 ]',
    '[ ...(eval) ]',
    '[ ...(arguments) ]',
    '[ ...(eval = 0) ]',
    '[ ...(arguments = 0) ]',
    '[ ...(eval) = 0 ]',
    '[ ...(arguments) = 0 ]'
  ]) {
    it(`'use strict'; (${arg} = {})`, () => {
      t.throws(() => {
        parseSource(`'use strict'; (${arg} = {})`, undefined, Context.OptionsWebCompat);
      });
    });

    it(`'use strict'; for (${arg} of {}) {}`, () => {
      t.throws(() => {
        parseSource(`'use strict'; for (${arg} of {}) {}`, undefined, Context.OptionsWebCompat);
      });
    });

    it(`'use strict'; for (${arg} in {}) {}`, () => {
      t.throws(() => {
        parseSource(`'use strict'; for (${arg} in {}) {}`, undefined, Context.OptionsWebCompat);
      });
    });

    it(`'use strict'; for (${arg} in {}) {}`, () => {
      t.throws(() => {
        parseSource(`'use strict'; for (${arg} in {}) {}`, undefined, Context.OptionsNext);
      });
    });

    it(`for (${arg} in {}) {}`, () => {
      t.throws(() => {
        parseSource(`for (${arg} in {}) {}`, undefined, Context.Strict | Context.Module);
      });
    });
  }

  for (const arg of [
    'var eval',
    'var arguments',
    'var foo, eval;',
    'var foo, arguments;',
    'try { } catch (eval) { }',
    'try { } catch (arguments) { }',
    'function eval() { }',
    'function foo(eval) { }',
    'function foo(arguments) { }',
    'function foo(bar, eval) { }',
    'function foo(bar, arguments) { }',
    // 'eval => icefapper', // evil?
    '(eval) => { }',
    '(arguments) => { }',
    '(foo, eval) => { }',
    '(foo, arguments) => { }',
    'eval = 1;',
    'arguments = 1;',
    '[ arguments = 0 ]',
    'var foo = eval = 1;',
    'var foo = arguments = 1;',
    '++eval;',
    '++arguments;',
    'eval++;',
    'arguments++;',
    '--arguments;',
    '{ eval = 0 }',
    '{ arguments = 0 }',
    '[ arguments = 0 ]',
    '[ (eval = 0) ]',
    '[ (arguments = 0) ]',
    '[ (eval) = 0 ]',
    '[ (arguments) = 0 ]',
    '[ ...(eval) = 0 ]',
    '[ ...(arguments) = 0 ]',
    '[...eval] = arr',
    '(arguments)++;',
    '++(arguments);',
    '++(eval);',
    '(eval)++;',
    '(arguments) = 1;',
    'eval++',
    '--arguments',
    "'use strict'; var { x : arguments } = {};",
    "'use strict'; var { eval } = {};",
    "'use strict'; var { ...arguments } = {};",
    "'use strict'; var [arguments] = {};",
    "'use strict'; var { eval = false } = {};",
    "'use strict'; var { x : arguments } = {};",
    "'use strict'; function f(arguments) {}",
    "'use strict'; var { x : arguments } = {};",
    "'use strict'; function f(argument1, { x : arguments }) {}",
    "'use strict'; function f(argument1, { a : arguments }) {}",
    "'use strict'; function f(argument1, { x : private }) {}",
    "'use strict'; function f(argument1, { arguments = false }) {}",
    'arguments[0],'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Strict);
      });
    });
  }

  // Valid in strict mode
  for (const arg of [
    'eval;',
    'arguments;',
    'eval: a',
    'arguments[1] = 7;',
    'arguments[1]--;',
    'arguments[1] = 7;',
    '--arguments[1];',
    'var foo = eval;',
    'var foo = arguments;',
    'var foo = { eval: 1 };',
    'var foo = { arguments: 1 };',
    'var foo = { }; foo.eval = {};',
    'var foo = { }; foo.arguments = {};',
    '(0,eval)(true)'
  ]) {
    it(`"use strict"; ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`"use strict"; ${arg}`, undefined, Context.None);
      });
    });

    it(`function foo() { "use strict"; ${arg} }`, () => {
      t.doesNotThrow(() => {
        parseSource(`function foo() { "use strict";  ${arg} }`, undefined, Context.None);
      });
    });

    it(`() => { "use strict"; ${arg} }`, () => {
      t.doesNotThrow(() => {
        parseSource(`() => { "use strict";  ${arg} }`, undefined, Context.None);
      });
    });
  }

  // Valid 'eval' and 'arguments' in sloppy mode
  for (const arg of [
    'var eval;',
    'var arguments',
    'var foo, eval;',
    'var foo, arguments;',
    'try { } catch (eval) { }',
    'try { } catch (arguments) { }',
    'function eval() { }',
    'function arguments() { }',
    'function foo(eval) { }',
    'function foo(arguments) { }',
    'function foo(bar, eval) { }',
    'function foo(bar, arguments) { }',
    'eval = 1;',
    'arguments = 1;',
    'var foo = eval = 1;',
    'var foo = arguments = 1;',
    '++eval;',
    '++arguments;',
    'eval++;',
    'arguments++;',
    'eval;',
    'arguments;',
    'arguments[1] = 7;',
    'arguments[1]--;',
    'foo = arguments[1];',
    '({*eval() {}})',
    '"use strict"; ({*eval() {}})',
    '({*arguments() {}})',
    '({get eval() {}})',
    '({get arguments() {}})',
    '({set eval(_) {}})',
    '({set arguments(_) {}})',
    '"use strict"; ({set eval(_) {}})',
    '"use strict"; ({set arguments(_) {}})',
    'class C {eval() {}}',
    'class C {arguments() {}}',
    'class C {*eval() {}}',
    'class C {*arguments() {}}',
    'class C {get eval() {}}',
    'class C {get arguments() {}}',
    'class C {set eval(_) {}}',
    'class C {set arguments(_) {}}',
    'class C {static eval() {}}',
    'class C {static arguments() {}}',
    'class C {static *eval() {}}',
    'class C {static *arguments() {}}',
    'class C {static get eval() {}}',
    'class C {static get arguments() {}}',
    'class C {static set eval(_) {}}',
    'class C {static set arguments(_) {}}',
    'var actual = "" + function ([arguments]) {return arguments;};',
    `(function ([a, b, arguments, d], [e, f, arguments]) {return arguments();})`,
    '(function ([arguments, arguments]) {return arguments();})',
    'var f = function ([arguments]) {return arguments + 1;};',
    'var o = {"arguments": 42};',
    'delete o.arguments;',
    'var arguments = 42;',
    `var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;`,
    `function get_arg_2() { return arguments[2]; }`,
    'var n = arguments.length > 1 ? ToInteger(arguments[1]) + 0 : 0;',
    'var lastIndex = arguments.length - 1, lastArg = arguments[lastIndex];',
    'arguments[0]',
    'arguments[0] /** the image src url */',
    'function foo(){writeLine(typeMap[typeof(arguments)]);}foo(1);',
    'function foo(){var arguments;writeLine(typeMap[typeof(arguments)]);}foo(1);',
    `eval('arguments="test1"');`,
    'arguments[0] = "arguments[0]";',
    'write("args[1] : " + arguments[1]);',
    'target.apply(that, arguments);',
    'write(x + " " + arguments[0]);',
    'arguments.callee ',
    'arguments.callee.configurable = true',
    'Test4.arguments = 10;',
    'class c { constructor() { result = [...arguments]; } };',
    'eval[0]++;',
    '++eval[0];',
    'eval.a++;',
    '++eval.a;',
    'arguments[0]++;',
    '++arguments[0];',
    ' arguments.a++;',
    ' ++arguments.a;',
    'eval[0] = 1;',
    'arguments.a = 1;',
    '++arguments[0];'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.OptionsWebCompat);
      });
    });

    it(`function foo() { ${arg} }`, () => {
      t.doesNotThrow(() => {
        parseSource(`function foo() { ${arg} }`, undefined, Context.OptionsWebCompat);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.None);
      });
    });

    it(`function foo() { ${arg} }`, () => {
      t.doesNotThrow(() => {
        parseSource(`function foo() { ${arg} }`, undefined, Context.None);
      });
    });
  }
});
