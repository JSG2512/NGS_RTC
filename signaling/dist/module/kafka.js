let instance;
const makeSingleton = (initial) => {
    let _value = initial;
    return {
        getValue: () => _value,
        setValue: (value) => (_value = value),
    };
};
const getInstance = (initial) => {
    if (!instance) {
        instance = makeSingleton(initial);
        return instance;
    }
    if (initial) {
        throw Error("Singleton already initialised");
    }
    return instance;
};
export default getInstance;
