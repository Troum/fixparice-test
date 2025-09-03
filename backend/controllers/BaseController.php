<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;

abstract class BaseController extends Controller
{
    protected function getService(string $serviceClass)
    {
        return Yii::$container->get($serviceClass);
    }
}