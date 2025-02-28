<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class SendNotificationWhatsApp implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $target;
    protected $message;

    /**
     * Create a new job instance.
     */
    public function __construct($target, $message)
    {
        $this->target = $target;
        $this->message = $message;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $response = Http::withHeaders([
            'Authorization' => '8nF33GVXjk1g2vofowSC',
        ])->post('https://api.fonnte.com/send', [
            'target' => $this->target,
            'message' => $this->message,
        ]);

        if ($response->failed()) {
            // Handle the failure (e.g., log the error)
            logger()->error('Fonnte API request failed', ['response' => $response->body()]);
        }
    }
}
