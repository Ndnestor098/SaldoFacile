<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::prefix('/incomes')
                ->name('incomes.')
                ->middleware(['web', 'auth', 'verified'])
                ->group(base_path('routes/incomes.php'));
            
            Route::prefix('/expenses')
                ->name('expenses.')
                ->middleware(['web', 'auth', 'verified'])
                ->group(base_path('routes/expenses.php'));
            Route::prefix('/profile')
                ->name('profile.')
                ->middleware(['web', 'auth', 'verified'])
                ->group(base_path('routes/profile.php'));
            Route::prefix('/advice')
                ->name('advice.')
                ->middleware(['web', 'auth', 'verified'])
                ->group(base_path('routes/advice.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        if(env('APP_ENV') === 'production') {
            $middleware->trustProxies(
                at: '*',
                headers: Request::HEADER_X_FORWARDED_FOR |
                         Request::HEADER_X_FORWARDED_HOST |
                         Request::HEADER_X_FORWARDED_PORT |
                         Request::HEADER_X_FORWARDED_PROTO |
                         Request::HEADER_X_FORWARDED_AWS_ELB
            );
        }
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
