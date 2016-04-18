"use strict";
describe('User', function () {
    it('has name', function () {
        var user = { pwd: 'sadfasfsaf', name: 'Super Cat' };
        expect(user.name).toEqual('Super Cat');
    });
    it('has pwd', function () {
        var user = { pwd: 'sadfasfsaf', name: 'Super Cat' };
        expect(user.pwd).toEqual('sadfasfsaf');
    });
});
//# sourceMappingURL=login-unit-test.js.map