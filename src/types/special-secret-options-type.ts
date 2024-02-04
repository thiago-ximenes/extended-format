import SecretOptionsType from "./secret-options-type";

type SpecialSecretOptionsType = Omit<SecretOptionsType, 'start' | 'end'> & {
    specialCharacter: string | Array<string>;
    start: number | Array<number>;
    end: number | Array<number>;
}

export default SpecialSecretOptionsType;
