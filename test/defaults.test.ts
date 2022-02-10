import * as assert from 'assert';
import {DEFAULTS as defaults, handleDefaults} from '../src/defaults';

describe('test/defaults.test.ts', () => {
  it('should set the global default params', async () => {
    handleDefaults({baseUrl: 'https://leaf-x.com'});

    assert(defaults.get('baseUrl') === 'https://leaf-x.com');
  });
});
