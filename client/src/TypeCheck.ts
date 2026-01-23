
export function checkType(object: any, toCheck: any) {
    if (!(object instanceof toCheck)) {
        throw new Error(`Type check fail: expected type ${typeof toCheck}, got type ${typeof object}`);
    }
}