<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;

class QueryLogServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {

        if (config('app.env') === 'local') {
            DB::listen(function ($query) {
                $bindings = $query->bindings;
                $sql = str_replace(array('%', '?'), array('%%', '%s'), $query->sql);
                $log = vsprintf($sql, $bindings);
                $time = $query->time;
                $connection = $query->connection->getName();
                $message = sprintf('[%s] %s', $connection, $log);
                \Illuminate\Support\Facades\Log::channel('single')->debug($message, ['time' => $time]);
            });
        }
    }
}
