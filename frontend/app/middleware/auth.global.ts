import {useAuth} from "~/composable/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const publicRoutes = ['index', 'login'];

    // Demo маршруты обрабатываются своим middleware
    if (publicRoutes.includes(to.name as string) || to.path.startsWith('/demo')) {
        return;
    }

    const {
        isTokenExpired,
        isTokenExpiringSoon,
        getCurrentUser,
        logout,
        user,
        token
    } = useAuth();

    if (!token.value?.access_token) {
        await logout();
        return;
    }

    if (isTokenExpired()) {
        await logout();
        return;
    }

    if (user.value && !isTokenExpiringSoon(300)) {
        return;
    }

    try {
        await getCurrentUser();
    } catch (error: any) {
        if (error?.status === 401 || error?.status === 403) {
            await logout();
            return;
        }

        if (!user.value) {
            await logout();
            return;
        }
    }
});
