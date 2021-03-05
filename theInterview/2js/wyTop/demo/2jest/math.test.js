const sum = require('./math.js');

test('加法测试', () => {
  expect(sum(1, 2)).toBe(3);
});

