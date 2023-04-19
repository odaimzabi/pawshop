<?php

namespace App\Services;

use Aws\S3\S3Client;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class S3Service
{

    protected $s3;

    public function __construct()
    {
        $this->s3 = new S3Client([
            'version' => 'latest',
            'region' => config("filesystems.disks.s3.region"),
            'credentials' => [
                'key' => config("filesystems.disks.s3.key"),
                'secret' => config("filesystems.disks.s3.secret")
            ]
        ]);
    }

    public function uploadFile(string $key)
    {
        $args = explode(".", $key);
        $randomKey = Str::random(10);
        $newKey = $randomKey . '.' . $args[1];

        $cmd = $this->s3->getCommand('PutObject', [
            'Bucket' => config('filesystems.disks.s3.bucket'),
            'Key' => $newKey,
        ]);

        $presignedUrl = $this->s3->createPresignedRequest($cmd, "+1 hour");
        return ["newKey" => $newKey, "url" => (string)$presignedUrl->getUri()];
    }

    public function getFile(string $key)
    {
        $cmd = $this->s3->getCommand('GetObject', [
            'Bucket' => config('filesystems.disks.s3.bucket'),
            'Key' => $key,
            'Expires' => 3600
        ]);

        $presignedUrl = $this->s3->createPresignedRequest($cmd, '+1 hour');

        return (string) $presignedUrl->getUri();
    }
}
