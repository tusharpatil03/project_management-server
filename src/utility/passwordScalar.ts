// passwordScalar.ts
import { GraphQLScalarType, Kind } from 'graphql';

const isValidPassword = (value: string): boolean => {
  // Example rules: min 8 chars, at least 1 digit & 1 special char
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(value);
};

export const PasswordScalar = new GraphQLScalarType({
  name: 'Password',
  description: 'Custom scalar for password validation',

  serialize(value) {
    // Don't expose passwords back
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
