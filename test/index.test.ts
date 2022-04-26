import RangeList from '../src/index';

const rl = new RangeList();

test('test RangeList add function', () => {
  rl.add([1, 5]);
  expect(rl.print()).toBe('[1, 5)');
});

test('test RangeList remove function', () => {
  
  rl.add([10, 20]);
  rl.add([20, 20]);
  rl.add([20, 21]);
  rl.add([2, 4]);
  rl.add([3, 8]);
  rl.remove([10, 10]);
  expect(rl.print()).toBe('[1, 8) [10, 21)');
});
