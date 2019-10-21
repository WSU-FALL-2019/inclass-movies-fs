import { ValidatorFn, AbstractControl } from '@angular/forms';

export function rangeValidator(min: number, max: number) : ValidatorFn {
    return (control: AbstractControl) : { [key: string ] : any} | null => {
        let value = parseFloat(control.value)

        return value === NaN || value < min || value > max 
            ? {invalidRange: {valid : false, value: value}}
            : null
    }
}