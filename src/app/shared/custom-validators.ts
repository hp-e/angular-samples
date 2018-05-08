import { AbstractControl, ValidatorFn } from '@angular/forms';

// export function birthIdValidator(): ValidatorFn {
//   return (c: AbstractControl) => {
//     const isValid = CustomValidators.birthId(c.value.toString());

//     if (isValid) {
//       return null;
//     } else {
//       return {
//         birthId: {
//           valid: false
//         }
//       };
//     }
//   };
// }

function isNumeric(n: any): n is number | string {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export class CustomValidators {
  public static birthId(birthNumber: string): boolean {
    const length = birthNumber.length;

    if (length !== 11) {
      console.log('not valid birthId', birthNumber, length);
      return false;
    }

    let controlNumber1 = this.modulus11(birthNumber, [
      3,
      7,
      6,
      1,
      8,
      9,
      4,
      5,
      2
    ]);

    if (controlNumber1 === 11) {
      controlNumber1 = 0;
    }
    if (controlNumber1 !== +birthNumber.charAt(9)) {
      console.log('Number is not valid', controlNumber1, birthNumber.charAt(9));
      return false;
    }

    let controlNumber2 = this.modulus11(birthNumber, [
      5,
      4,
      3,
      2,
      7,
      6,
      5,
      4,
      3,
      2
    ]);
    if (controlNumber2 === 11) {
      controlNumber2 = 0;
    }
    if (controlNumber2 !== +birthNumber.charAt(10)) {
      console.log(
        'Number is not valid',
        controlNumber2,
        birthNumber.charAt(10)
      );
      return false;
    }

    return true;
  }

  public static modulus11(numbers: string, factors: number[]): number {
    const length = factors.length;
    let sum = 0;

    for (let i = 0; i < length; i++) {
      const digit = +numbers[i];
      const factor = factors[i];
      sum = sum + factor * digit;
    }

    return 11 - sum % 11;
  }

  public static rangeValidator(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (
        c.value !== undefined &&
        (isNaN(c.value) || c.value < min || c.value > max)
      ) {
        // invalid
        return { range: true };
      }

      // valid
      return null;
    };
  }

  public static birthIdValidator(
    c: AbstractControl
  ): { [key: string]: boolean } | null {

    if (c === null || c.value === null) {
      return null;
    }

    const testVal = c.value.toString();

    if (testVal.length !== 11) {
      return { birthId: true };
    }

    const result = CustomValidators.birthId(testVal);

    if (result) {
      return null;
    } else {
      return { birthId: true };
    }
  }

  mod11OfNumberWithControlDigit(input: any) {
    let controlNumber = 2,
      sumForMod = 0,
      i,
      result;

    for (i = input.length - 2; i >= 0; --i) {
      sumForMod += input.charAt(i) * controlNumber;
      if (++controlNumber > 7) {
        controlNumber = 2;
      }
    }
    result = 11 - sumForMod % 11;

    return result === 11 ? 0 : result;
  }

  private orgNumber(orgNumber: string): boolean {
    orgNumber += '';
    if (!orgNumber || orgNumber.length !== 9) {
      return false;
    }
    return (
      parseInt(orgNumber.charAt(orgNumber.length - 1), 10) ===
      this.mod11OfNumberWithControlDigit(orgNumber)
    );
  }
}
