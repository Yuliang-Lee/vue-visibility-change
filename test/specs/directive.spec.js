import sinon from 'sinon';
import Vue from 'vue';
import visibility from '@/index';
import { createVue, destroyVM, visibilitychange } from '../utils';

Vue.use(visibility);

describe('directive test', function() {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('bind directive callback', function(done) {
    vm = createVue({
      template: `<div v-visibility-change="handleVisibilityChange">
        <h1>{{ hidden }}</h1>
      </div>`,
      data() {
        return {
          hidden: true
        }
      },
      methods: {
        handleVisibilityChange(evt, hidden) {
          this.hidden = hidden;
        }
      }
    }, true);
    const vm2 = createVue('<div v-visibility-change=""></div>', true);

    assert(vm.$el.querySelector('h1').textContent === 'true');
    visibilitychange();

    Vue.nextTick(_ => {
      assert(vm.$el.querySelector('h1').textContent === 'false');

      done();
    });
    
  });
});