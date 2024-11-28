import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const url = '/posts';
const baseURL = 'https://jsonplaceholder.typicode.com';
const data = [{ id: 1, post: 'post' }];

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.runAllTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const spyOnCreate = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(url);

    expect(spyOnCreate).toBeCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const spyOnGet = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi(url);

    expect(spyOnGet).toBeCalledWith(url);
  });

  test('should return response data', async () => {
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue({ data });

    await expect(throttledGetDataFromApi(url)).resolves.toBe(data);
  });
});
