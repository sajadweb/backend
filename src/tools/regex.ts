export function isMobile(mobile: string): boolean {
    if (/^09[0-9]{9}$/.test(mobile)) {
        return true;
    }
    return false;
}