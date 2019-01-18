export function isMobile(mobile: string): boolean {
    if (/^09[0-9]{9}$/.test(mobile)) {
        return true;
    }
    return false;
}
export function isCode(code: any): boolean {
    if (/^[0-9]{6}$/.test(code)) {
        return true;
    }
    return false;
}