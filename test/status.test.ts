// import * as assert from 'assert';
// import {checkStatus} from '../src/status';

// describe('test/status.test.ts', () => {
//   it('should be the result of checking the normal status', async () => {
//     const response = {ok: true} as Response;
//     const result = checkStatus(response);

//     assert(result.ok);
//   });

//   it('should be the result of checking the abnormal status', async () => {
//     try {
//       const response = {
//         ok: false,
//         statusText: 'Internal service error.',
//       } as Response;

//       checkStatus(response);
//     } catch (error) {
//       assert(error.response.ok === false);
//       assert(error.response.statusText === 'Internal service error.');
//     }
//   });
// });
