import { Context } from '../../src/common';
import { pass } from '../test-utils';

describe('Statements - Empty', () => {
  pass('Statements - Empty (pass)', [
    [
      ';;;;;;;;',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          }
        ]
      }
    ]
  ]);
});
