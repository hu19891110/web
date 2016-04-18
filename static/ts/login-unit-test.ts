import {User} from "./login";

describe('User', () => {

  it('has name', () => {
    let user: User = {pwd: 'sadfasfsaf', name: 'Super Cat'};
    expect(user.name).toEqual('Super Cat');
  });

  it('has pwd', () => {
    let user: User = {pwd: 'sadfasfsaf', name: 'Super Cat'};
    expect(user.pwd).toEqual('sadfasfsaf');
  });
});