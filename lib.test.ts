import assert from 'node:assert';

import test from 'node:test';
import { add, subtract } from './lib';


test('lib', () => {
    assert.strictEqual(1 + 1, 2);
});


test('lib add()', () => {
    assert.strictEqual(add(1, 1), 2);
});


test('lib subtract()', () => {
    assert.strictEqual(subtract(4, 1), 3);
});

