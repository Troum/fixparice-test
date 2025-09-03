<?php

namespace app\services;

use app\models\UserEntity;
use app\services\contracts\RbacServiceInterface;
use Yii;

class RbacService implements RbacServiceInterface
{
    public function canUser(UserEntity $user, string $permission): bool
    {
        return Yii::$app->authManager->checkAccess($user->id, $permission);
    }

    public function getUserRoles(UserEntity $user): array
    {
        $assignments = Yii::$app->authManager->getAssignments($user->id);
        return array_keys($assignments);
    }

    public function getUserPermissions(UserEntity $user): array
    {
        $permissions = Yii::$app->authManager->getPermissionsByUser($user->id);
        return array_keys($permissions);
    }

    public function assignRole(UserEntity $user, string $roleName): bool
    {
        $auth = Yii::$app->authManager;
        $role = $auth->getRole($roleName);
        
        if (!$role) {
            return false;
        }

        $auth->revokeAll($user->id);
        $auth->assign($role, $user->id);
        
        return true;
    }

    public function revokeRole(UserEntity $user, string $roleName): bool
    {
        $auth = Yii::$app->authManager;
        $role = $auth->getRole($roleName);
        
        if (!$role) {
            return false;
        }

        return $auth->revoke($role, $user->id);
    }

    public function getAllRoles(): array
    {
        $roles = Yii::$app->authManager->getRoles();
        $result = [];
        
        foreach ($roles as $role) {
            $result[] = [
                'name' => $role->name,
                'description' => $role->description,
            ];
        }
        
        return $result;
    }

    public function getAllPermissions(): array
    {
        $permissions = Yii::$app->authManager->getPermissions();
        $result = [];
        
        foreach ($permissions as $permission) {
            $result[] = [
                'name' => $permission->name,
                'description' => $permission->description,
            ];
        }
        
        return $result;
    }
}
