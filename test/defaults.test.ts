import assert = require('assert');
import {DEFAULTS as defaults, handleDefaults} from '../src/defaults';

describe('test/url.test.ts', () => {
  it('should set the global default parameters.', async () => {
    handleDefaults({baseUrl: 'https://leaf-x.com'});

    assert(defaults.get('baseUrl') === 'https://leaf-x.com');
  });
});
