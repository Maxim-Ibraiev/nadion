const toggleArrayValue = <T = unknown>(arg: T[], value: T): T[] => arg.includes(value) ? arg.filter((item) => item !== value) : [...arg, value]

export default toggleArrayValue
