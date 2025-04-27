<?php

namespace Database\Seeders;

use App\Models\Icon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IconSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $icons = [
            'accessibility',
            'air-vent',
            'align-left',
            'armchair',
            'award',
            'baby',
            'badge-dollar-sign',
            'baggage-claim',
            'banknote-arrow-down',
            'banknote-arrow-up',
            'beef',
            'bird',
            'book-check',
            'briefcase',
            'bus',
            'cake-slice',
            'calculator',
            'calendar-days',
            'camera',
            'captions',
            'car',
            'cat',
            'chart-column',
            'cigarette',
            'clapperboard',
            'cross',
            'dog',
            'dollar-sign',
            'dumbbell',
            'earth-lock',
            'factory',
            'gift',
            'hand-coins',
            'handshake',
            'ham',
            'house',
            'house-wifi',
            'id-card',
            'leaf',
            'life-buoy',
            'mail-open',
            'map-pin',
            'monitor',
            'package',
            'package-open',
            'package-x',
            'paw-print',
            'phone',
            'school',
            'shapes',
            'shield-plus',
            'shirt',
            'smartphone',
            'user-check',
            'utility-pole',
            'utensils-crossed',
            'wallet-cards',
            'warehouse',
            'wifi',
            'zap',
        ];
        
        foreach ($icons as $icon) {
            Icon::create([
                'name' => $icon,
            ]);
        }
    }
}
