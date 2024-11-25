import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const { unmockedFunction } =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    unmockedFunction,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
    jest.clearAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spyOnConsole = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(spyOnConsole).toBeCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const spyOnConsole = jest.spyOn(console, 'log');

    unmockedFunction();

    expect(spyOnConsole).toBeCalledTimes(1);
  });
});
