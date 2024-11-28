import { generateLinkedList } from './index';

const elements = [1, 2];

const linkedList = {
  value: 1,
  next: { value: 2, next: { value: null, next: null } },
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(elements)).toStrictEqual(linkedList);
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(elements)).toMatchSnapshot();
  });
});
