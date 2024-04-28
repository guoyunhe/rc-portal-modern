import { render } from '@testing-library/react';
import Portal from '../src';

jest.mock('../src/util', () => {
  const origin = jest.requireActual('../src/util');
  return {
    ...origin,
    isBodyOverflowing: () => true,
  };
});

// Revert `useLayoutEffect` back to real one since we should keep order for test
jest.mock('rc-util-modern/dist/hooks/useLayoutEffect', () => {
  const origin = jest.requireActual('react');
  return origin.useLayoutEffect;
});

// Revert `useLayoutEffect` back to real one since we should keep order for test
jest.mock('rc-util-modern/dist/getScrollBarSize', () => {
  const origin = jest.requireActual('rc-util-modern/dist/getScrollBarSize');
  return {
    ...origin,

    getTargetScrollBarSize: () => ({ width: 93, height: 1128 }),
  };
});

describe('::-webkit-scrollbar', () => {
  it('support ::-webkit-scrollbar', () => {
    render(
      <Portal open autoLock>
        <p />
      </Portal>
    );

    expect(document.body).toHaveStyle({
      width: 'calc(100% - 93px)',
    });
  });
});
