<?php

namespace app\services\contracts;

use app\models\UserEntity;

interface RbacServiceInterface
{
    public function canUser(UserEntity $user, string $permission): bool;
    public function getUserRoles(UserEntity $user): array;
    public function getUserPermissions(UserEntity $user): array;
    public function assignRole(UserEntity $user, string $roleName): bool;
    public function revokeRole(UserEntity $user, string $roleName): bool;
    public function getAllRoles(): array;
    public function getAllPermissions(): array;
}
