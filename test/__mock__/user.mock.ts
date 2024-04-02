export const __MockUserDto = () => ({
  email: 'user.gmail.com',
  firstName: 'donald',
  lastName: 'trump',
  gender: 'male',
  password: '123456',
});

export const __MockUserService = () => ({
  create: jest.fn(),
  get: jest.fn(),
  paginate: jest.fn(),
  validateUserCredential: jest.fn(),
});
