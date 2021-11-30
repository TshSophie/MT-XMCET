<?php

namespace App\Providers;

use App\Services\Common\JwtAuthService;
use Illuminate\Support\ServiceProvider;

class JwtAuthProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('jwtAuth',function(){
            return new JwtAuthService();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
