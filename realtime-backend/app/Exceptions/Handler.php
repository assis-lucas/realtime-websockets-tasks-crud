<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (Exception $exception, $request) {


            if ($exception instanceof ValidationException) {
                return response()->json(json_encode([
                    'status' => 'error',
                    'msg' => 'Error',
                    'errors' => $exception->errors(),
                ]), 422);
            }

            if (env('APP_DEBUG', false)) {
                $code = $exception->getCode();
                $message = $exception->getMessage();
                $file = $exception->getFile();
                $line = $exception->getLine();
                $trace = $exception->getTrace();

                return $this->errorResponse(json_encode([
                    "code" => $code,
                    "message" => $message,
                    "file" => $file,
                    "line" => $line,
                    "trace" => $trace
                ]), 500);
            }

            return $this->errorResponse(
                __('errors.unexpected'),
                500
            );
        });
    }
}
