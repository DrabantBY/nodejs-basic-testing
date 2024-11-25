import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 1, action: Action.Divide, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 1, b: 1, action: Action.Subtract, expected: 0 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 3, b: 1, action: Action.Subtract, expected: 2 },
  { a: 1, b: 0, action: Action.Multiply, expected: 0 },
  { a: 2, b: 1, action: Action.Multiply, expected: 2 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 3, b: 1, action: Action.Exponentiate, expected: 3 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
];

describe.each(testCases)(
  'simpleCalculator table test for $a $action $b',
  ({ expected, ...args }) => {
    test(`should return ${expected}`, () => {
      expect(simpleCalculator(args)).toBe(expected);
    });
  },
);
