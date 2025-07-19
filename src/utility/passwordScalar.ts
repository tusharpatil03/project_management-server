import { GraphQLScalarType, Kind } from 'graphql';

const isValidPassword = (value: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
  return regex.test(value);
};

export const PasswordScalar = new GraphQLScalarType({
  name: 'Password',
  description: 'Custom scalar for password validation',

  serialize(value) {
    throw new Error('Passwords cannot be output from the server.');
  },

  parseValue(value) {
    if (typeof value !== 'string') {
      throw new Error('Password must be a string.');
    }
    if (!isValidPassword(value)) {
      throw new Error('Password does not meet security criteria.');
    }
    return value;
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new Error('Password must be a string.');
    }
    if (!isValidPassword(ast.value)) {
      throw new Error('Password does not meet security criteria.');
    }
    return ast.value;
  }
});
