import { b as useAuth } from './server.mjs';
import { computed } from 'vue';

function useRbac() {
  const { user } = useAuth();
  const hasRole = (role) => {
    return user.value?.roles?.includes(role) || false;
  };
  const hasPermission = (permission) => {
    return user.value?.permissions?.includes(permission) || false;
  };
  const hasAnyRole = (roles) => {
    return roles.some((role) => hasRole(role));
  };
  const hasAnyPermission = (permissions) => {
    return permissions.some((permission) => hasPermission(permission));
  };
  const hasAllPermissions = (permissions) => {
    return permissions.every((permission) => hasPermission(permission));
  };
  const canViewVacancies = computed(() => hasPermission("viewVacancy"));
  const canCreateVacancies = computed(() => hasPermission("createVacancy"));
  const canUpdateVacancies = computed(() => hasPermission("updateVacancy"));
  const canDeleteVacancies = computed(() => hasPermission("deleteVacancy"));
  const canViewStats = computed(() => hasPermission("viewStats"));
  const canManageUsers = computed(() => hasPermission("manageUsers"));
  const isAdmin = computed(() => hasRole("admin"));
  const isManager = computed(() => hasRole("manager"));
  const isEditor = computed(() => hasRole("editor"));
  const isViewer = computed(() => hasRole("viewer"));
  const userRole = computed(() => {
    if (isAdmin.value) return "admin";
    if (isManager.value) return "manager";
    if (isEditor.value) return "editor";
    if (isViewer.value) return "viewer";
    return "guest";
  });
  const getRoleBadgeColor = () => {
    switch (userRole.value) {
      case "admin":
        return "error";
      case "manager":
        return "warning";
      case "editor":
        return "info";
      case "viewer":
        return "success";
      default:
        return "neutral";
    }
  };
  const getRoleDisplayName = () => {
    switch (userRole.value) {
      case "admin":
        return "Администратор";
      case "manager":
        return "Менеджер";
      case "editor":
        return "Редактор";
      case "viewer":
        return "Наблюдатель";
      default:
        return "Гость";
    }
  };
  return {
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAnyPermission,
    hasAllPermissions,
    canViewVacancies,
    canCreateVacancies,
    canUpdateVacancies,
    canDeleteVacancies,
    canViewStats,
    canManageUsers,
    isAdmin,
    isManager,
    isEditor,
    isViewer,
    userRole,
    getRoleBadgeColor,
    getRoleDisplayName
  };
}

export { useRbac as u };
//# sourceMappingURL=useRbac-DtaKJM32.mjs.map
