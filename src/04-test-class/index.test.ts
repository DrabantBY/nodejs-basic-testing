import { random } from 'lodash';
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const balance = 100;
const amount = 50;
const account = getBankAccount(balance);
const target = getBankAccount(0);

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(balance + amount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(balance + amount, target)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(amount, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(account.deposit(amount)).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(balance + amount);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(amount)).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(balance);
  });

  test('should transfer money', () => {
    expect(account.transfer(amount, target)).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(balance - amount);
    expect(target.getBalance()).toBe(amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock)
      .mockReturnValueOnce(balance + amount)
      .mockReturnValueOnce(1);

    await expect(account.fetchBalance()).resolves.toBe(balance + amount);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock)
      .mockReturnValueOnce(balance + amount)
      .mockReturnValueOnce(1);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(balance + amount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(balance).mockReturnValueOnce(0);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
