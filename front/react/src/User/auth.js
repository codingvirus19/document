const users = [
    { email: 'a', password: 'a', name: '이예은' },
    { email: 'lee@test.com', password: '456', name: 'Lee' },
    { email: 'park@test.com', password: '789', name: 'Park' }
  ]
  
  export function signIn({ email, password }) {
    const user = users.find(user => user.email === email && user.password === password);
    if (user === undefined) throw new Error();
    return user;
  }