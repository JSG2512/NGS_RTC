export type SingletonValue = {
    name: string;
};
declare const getInstance: (initial?: SingletonValue) => {
    getValue: () => SingletonValue | undefined;
    setValue: (value: SingletonValue) => SingletonValue;
};
export default getInstance;
