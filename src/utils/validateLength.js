export const minLength = min => value => value && value.length >= min;
export const maxLength = max => value => value && value.length <= max;
export const exactLength = exact => value => value && value.length === exact;
