import { useSelector } from "react-redux";

export const usePermission = () => {
  const userPermissions = useSelector((state) => state.auth.permissions); // Get permissions array from your auth slice
  //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get authentication status

  const hasPermission = (permissionSlug) => {
    if (
      !userPermissions ||
      !Array.isArray(userPermissions) ||
      userPermissions.length === 0
    ) {
      // If not authenticated, or permissions are not loaded/invalid, deny access.
      return false;
    }
    // Check if the user's permissions array includes the required slug
    return userPermissions.includes(permissionSlug);
  };

  return { hasPermission };
};
