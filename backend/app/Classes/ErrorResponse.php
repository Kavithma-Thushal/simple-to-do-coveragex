<?php

namespace App\Classes;

use ErrorException;
use App\Enums\HttpStatus;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class ErrorResponse
{
    public static function validationError(Validator $validator): void
    {
        $errors = collect($validator->errors()->messages())->map(fn($messages) => $messages[0])->toArray();
        self::throw($errors, HttpStatus::UNPROCESSABLE_CONTENT);
    }

    private static function throw(array|string $errors = ['Something went wrong. Process not completed!'], int $status = HttpStatus::INTERNAL_SERVER_ERROR): void
    {
        throw new HttpResponseException(response()->json(["error" => $errors], $status));
    }

    public static function rollback(Throwable $error, string $message = 'Something went wrong. Process not completed!'): void
    {
        DB::rollBack();
        if (config('app.debug')) $message = $error->getMessage() . ' on line ' . $error->getLine() . ' in ' . $error->getFile();
        self::throwException($error, $message);
    }

    public static function throwException(Throwable $error, string $message = 'Something went wrong. Process not completed!', int $status = HttpStatus::INTERNAL_SERVER_ERROR): void
    {
        if ($error instanceof HttpException) {
            $message = $error->getMessage();
            $status = $error->getStatusCode();
        } elseif ($error instanceof ErrorException) {
            $status = HttpStatus::INTERNAL_SERVER_ERROR;
        }
        self::throw([config('common.generic_error') => $message], $status);
    }
}
