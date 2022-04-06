import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import moment = require('moment');

export function IsValidDateTime(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsValidDateTimeConstraint,
    });
  };
}

export function IsGreaterToday(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsGreaterTodayConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsValidDateTime' })
export class IsValidDateTimeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value === 'string') {
      return (
        /^[1-9]\d*-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) (0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(
          value,
        ) && moment(value, 'YYYY-MM-DD HH:II').isValid()
      );
    }
    return false;
  }
}

@ValidatorConstraint({ name: 'IsGreaterToday' })
export class IsGreaterTodayConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    // Compare if the current date in utc 0 adding the received time zone is greater than the received date
    return !moment.utc().add(relatedValue, 'hours').isAfter(moment(value));
  }
}
