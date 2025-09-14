import { describe, it, expect } from 'bun:test';

describe('Basic App Tests', () => {
	it('should pass basic test', () => {
		expect(1 + 1).toBe(2);
	});

	it('should test string concatenation', () => {
		const message = 'Email Service';
		expect(message + ' v2').toBe('Email Service v2');
	});

	it('should test environment', () => {
		expect(typeof process.env).toBe('object');
	});
});
