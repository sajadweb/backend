export function hasPermission(user, permissionsNeeded) {
    if (user === undefined) {
        throw new Error("کاریر گرامی شما هنوز وارد نشده اید")
    }
    if (user.permission === undefined || user.permission.length === 0) {
        throw new Error("کاریر گرامی هیچ سطح دسترسی برای شما تعریف نشده")
    }
    const matchedPermissions = user.permission.filter(permissionTheyHave =>
        permissionsNeeded.includes(permissionTheyHave)
    );
    if (!matchedPermissions.length) {
        throw new Error("کاریر گرامی برای شما دسترسی  به این نمایه تعریف نشده")
    }
}
