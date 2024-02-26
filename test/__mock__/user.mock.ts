export const mockUserDto = {
  email: 'user.gmail.com',
  firstName: 'donald',
  lastName: 'trump',
  gender: 'male',
  password: '123456',
};

export const mockUserService = {
  create: jest.fn(),
  get: jest.fn(),
  paginate: jest.fn(),
  validateUserCredential: jest.fn(),
};
