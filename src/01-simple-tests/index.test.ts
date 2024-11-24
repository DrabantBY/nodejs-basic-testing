import { simpleCalculator, Action } from './index';

const a = 4;
const b = 2;

const results = {
  [Action.Add]: 6,
  [Action.Subtract]: 2,
  [Action.Divide]: 2,
  [Action.Multiply]: 8,
  [Action.Exponentiate]: 16,
};

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const action = Action.Add;
    expect(simpleCalculator({ a, b, action })).toBe(results[action]);
  });

  test('should subtract two numbers', () => {
    const action = Action.Subtract;
    expect(simpleCalculator({ a, b, action })).toBe(results[action]);
  });

  test('should multiply two numbers', () => {
    const action = Action.Multiply;
    expect(simpleCalculator({ a, b, action })).toBe(results[action]);
  });

  test('should divide two numbers', () => {
    const action = Action.Divide;
    expect(simpleCalculator({ a, b, action })).toBe(results[action]);
  });

  test('should exponentiate two numbers', () => {
    const action = Action.Exponentiate;
    expect(simpleCalculator({ a, b, action })).toBe(results[action]);
  });

  test('should return null for invalid action', () => {
    const action = '%';
    expect(simpleCalculator({ a, b, action })).toBeNull;
  });

  test('should return null for invalid arguments', () => {
    const a = '0';
    const b = 100;
    const action = Action.Add;
    expect(simpleCalculator({ a, b, action })).toBeNull;
  });
});
