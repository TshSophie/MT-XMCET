<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    // protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            // 加载system模块路由
            Route::prefix('api/v1')
                ->middleware('authWebToken')
                ->namespace($this->namespace)
                ->group(base_path('routes/v1/system.php'));

            // 加载admin模块路由
            Route::prefix('api/v1')
                ->middleware('authWebToken')
                ->namespace($this->namespace)
                ->group(base_path('routes/v1/admin.php'));

            // 加载common类型路由
            Route::prefix('api/v1')
            ->middleware('authWebToken')
                ->namespace($this->namespace)
                ->group(base_path('routes/v1/common.php'));

            // 加载app类型路由
            Route::prefix('api/v1')
                ->middleware('authAppToken')
                ->namespace($this->namespace)
                ->group(base_path('routes/v1/app.php'));

            // 加载public类型路由
            Route::prefix('api/v1')
                ->namespace($this->namespace)
                ->group(base_path('routes/v1/public.php'));

            // 加载app-public类型路由
            Route::prefix('api/v1')
                ->namespace($this->namespace)
                ->group(base_path('routes/v1/app-public.php'));

            // Route::middleware('web')
            //     ->namespace($this->namespace)
            //     ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by(optional($request->user())->id ?: $request->ip());
        });
    }
}
