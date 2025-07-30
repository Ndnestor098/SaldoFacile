<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        {{-- Open Graph para redes sociales --}}
        <meta property="og:title" content="SaldoFacile - Organiza tus Finanzas" />
        <meta
            property="og:description"
            content="SaldoFacile es una aplicación web moderna para gestionar tus finanzas personales, calcular impuestos y simular créditos o hipotecas. Pensada para personas que desean tener un control claro de sus ingresos, gastos, balances mensuales, y planificar mejor su economía."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://saldofacile.ndnestor.com" />
        <meta
            property="og:image"
            content="https://saldofacile.ndnestor.com/assets/images/page.webp"
        />
        <meta property="og:site_name" content="SaldoFacile" />

         {{-- Twitter Card (opcional)  --}}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SaldoFacile - Organiza tus Finanzas" />
        <meta
            name="twitter:description"
            content="SaldoFacile es una aplicación web moderna para gestionar tus finanzas personales, calcular impuestos y simular créditos o hipotecas. Pensada para personas que desean tener un control claro de sus ingresos, gastos, balances mensuales, y planificar mejor su economía."
        />
        <meta
            name="twitter:image"
            content="https://saldofacile.ndnestor.com/assets/images/page.webp"
        />

        <!-- Favicon -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <link rel="icon" type="image/png" href="/assets/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="SaldoFacile" />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
