import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPassword', async: false })
export class IsPassword implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const length = password.length < 8 ? false : true;

    return hasNumber && hasUppercase && hasLowercase && length;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must contain at least one number, one uppercase letter, and one lowercase letter and 8 characters.';
  }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPassword,
    });
  };
}
