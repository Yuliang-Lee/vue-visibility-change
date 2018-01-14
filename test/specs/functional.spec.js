import { visibilitychange } from '../utils';
import visibility from '@/index';
import sinon from 'sinon';

describe('functional test', () => {
  it('hidden() === false', () => {
    assert(visibility.hidden() === false);
  });

  it('isSupported() === true', () => {
    assert(visibility.isSupported());
  });

  it('change and unbind', () => {
    const callback = sinon.spy();
    const handler = visibility.change(callback);

    visibilitychange();

    assert(typeof handler === 'number');
    assert(callback.called);

    visibility.unbind(handler);

  });

  it('bind two callback dont add two listener', () => {
    const callback = sinon.spy();
    const handler = visibility.change(callback);
    const handler2 = visibility.change(callback);

    visibilitychange();

    assert(handler2 - handler === 1);
    assert(callback.calledTwice);
  });

  it('when browser dose not support visibility API', () => {
    sinon.stub(visibility, 'isSupported').callsFake(() => false);
    const callback = sinon.spy();
    const handler = visibility.change(callback);

    assert(visibility.isSupported() === false);
    assert(handler === false);
    visibility.isSupported.restore();
  });
});
