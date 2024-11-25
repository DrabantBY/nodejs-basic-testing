import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

const callback = jest.fn();
const timeout = 1000;
const fileName = 'file.txt';
const fileText = 'any text';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

const mockExistsSync = jest.mocked(existsSync);
const mockReadFile = jest.mocked(readFile);

describe('doStuffByTimeout', () => {
  let spyOnTimeout: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    spyOnTimeout = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);

    expect(spyOnTimeout).toBeCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let spyOnInterval: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    spyOnInterval = jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, timeout);

    expect(spyOnInterval).toBeCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(3 * timeout);

    expect(callback).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyOnJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(fileName);

    expect(spyOnJoin).toBeCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    mockExistsSync.mockReturnValueOnce(false);

    await expect(readFileAsynchronously(fileName)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockExistsSync.mockReturnValueOnce(true);

    mockReadFile.mockResolvedValueOnce(Buffer.from(fileText));

    await expect(readFileAsynchronously(fileName)).resolves.toBe(fileText);
  });
});
