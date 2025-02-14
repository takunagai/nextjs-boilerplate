import { describe, it, expect } from 'vitest';

describe('Sample Test', () => {
  it('should add two numbers', () => {
    const sum = (a: number, b: number) => a + b;
    expect(sum(1, 2)).toBe(3);
  });

  it('should subtract two numbers', () => {
    const subtract = (a: number, b: number) => a - b;
    expect(subtract(5, 2)).toBe(3);
  });
});
