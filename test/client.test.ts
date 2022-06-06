import Client from '../src/Client';
import assert from 'assert';

describe('Apex API Tests', () => {
  const key = process.env.API_KEY as string;
  const username = process.env.APEX_USERNAME as string;

  const ApexAPI = new Client(key);
  beforeEach((done) => setTimeout(done, 3000));

  it('Lookup user stats', (done) => {
    ApexAPI.getUserStats(username).then((res) => {
      assert.equal(typeof res, 'object');
      done();
    });
  });

  it('Lookup crafting', (done) => {
    ApexAPI.getCrafting().then((res) => {
      assert.equal(typeof res, 'object');
      done();
    });
  });

  it('Lookup map rotation', (done) => {
    ApexAPI.getMap().then((res) => {
      assert.equal(typeof res, 'object');
      done();
    });
  });

  it('Lookup store', (done) => {
    ApexAPI.getStore().then((res) => {
      assert.equal(typeof res, 'object');
      done();
    });
  });
});
