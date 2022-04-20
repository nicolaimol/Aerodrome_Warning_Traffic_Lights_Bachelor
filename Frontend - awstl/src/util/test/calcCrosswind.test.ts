import { crosswind } from '../calcCrosswind';

test ('Test crosswind 0 grader', () => {
    expect(crosswind('01/19', 190, 10)).toBe(0);
})

test ('Test crosswind 90 grader', () => {
    expect(crosswind('01/19', 100, 10)).toBe(10);
})

test ('Test crosswind 45 grader', () => {
    expect(crosswind('01/19', 145, 10).toPrecision(2)).toBe('7.1')
})

