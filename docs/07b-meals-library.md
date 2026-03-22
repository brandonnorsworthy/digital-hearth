<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Meal Library - Digital Hearth</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container-lowest": "#ffffff",
              "surface-container-high": "#e4eadf",
              "background": "#f8faf3",
              "on-primary-fixed": "#32450d",
              "surface-container-highest": "#dde5d9",
              "tertiary-fixed": "#fca689",
              "primary-container": "#d2eca2",
              "on-tertiary-fixed-variant": "#6b301b",
              "on-secondary-container": "#435363",
              "secondary": "#506171",
              "on-surface-variant": "#596158",
              "secondary-fixed": "#d3e4f7",
              "secondary-dim": "#445564",
              "on-tertiary-fixed": "#441302",
              "on-secondary": "#f6f9ff",
              "surface-bright": "#f8faf3",
              "tertiary-dim": "#81412b",
              "tertiary": "#904d35",
              "primary-dim": "#455a20",
              "on-primary": "#f0ffcf",
              "on-background": "#2d342c",
              "secondary-container": "#d3e4f7",
              "primary-fixed": "#d2eca2",
              "on-secondary-fixed": "#314150",
              "secondary-fixed-dim": "#c5d6e9",
              "outline": "#757d73",
              "on-error-container": "#6e1400",
              "on-primary-fixed-variant": "#4d6227",
              "error-container": "#fd795a",
              "tertiary-fixed-dim": "#ed997d",
              "surface": "#f8faf3",
              "on-tertiary-container": "#602813",
              "surface-variant": "#dde5d9",
              "on-surface": "#2d342c",
              "inverse-primary": "#e0fbaf",
              "surface-container": "#eaf0e5",
              "primary": "#50662b",
              "error-dim": "#791903",
              "on-error": "#fff7f6",
              "primary-fixed-dim": "#c4de95",
              "on-tertiary": "#fff7f5",
              "inverse-surface": "#0c0f0b",
              "outline-variant": "#acb4a9",
              "tertiary-container": "#fca689",
              "on-primary-container": "#43581f",
              "surface-container-low": "#f1f5ec",
              "surface-dim": "#d5dcd0",
              "error": "#a73b21",
              "surface-tint": "#50662b",
              "on-secondary-fixed-variant": "#4d5d6d",
              "inverse-on-surface": "#9b9e98"
            },
            fontFamily: {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
      .glass-card {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
      }
      .tonal-depth-recession {
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
      }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="bg-background text-on-surface font-body min-h-screen pb-32">
<!-- TopAppBar Component -->
<header class="w-full top-0 sticky z-40 bg-[#f8faf3] dark:bg-[#1a1c18] tonal-depth-recession">
<div class="flex justify-between items-center px-6 py-4 w-full">
<div class="flex items-center gap-4">
<button class="text-[#50662b] dark:text-[#d2eca2] hover:bg-[#f1f5ec] dark:hover:bg-[#2d342c] transition-colors p-2 rounded-full active:scale-95 duration-200">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<h1 class="font-['Plus_Jakarta_Sans'] font-semibold text-xl text-[#50662b] dark:text-[#d2eca2]">Meal Library</h1>
</div>
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border-2 border-primary-container">
<img alt="User profile photo" class="w-full h-full object-cover" data-alt="A smiling woman with a warm expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALZISUmaiUOitz15ak82yD9aTY4g9ZiOE2337oSAeRdnesJZAtP8hFc5zqAJIrfv9PWgf_OJB0-v27KyqGvLeFMEsxCy3KLd1tRXILyrshBxZ6GDAjGYNOAfZ2wSipfVTO9qj2Bqn7Qo1lce4P4GxF4yddP3NTDeeuP5oZRAwu32rpurcUM54Feztafuc4G7tgF-iWcN84n8DQ4JQkxgsv34PifXy4Y-msQyC4EuYSJpdpfxEDtwQRWGMeV98MFN8j0OB3UgQ6-mNg"/>
</div>
</div>
</div>
</header>
<main class="max-w-7xl mx-auto px-6 pt-8">
<!-- Hero Search Section -->
<section class="mb-12">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
<div class="max-w-2xl">
<h2 class="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-3">What's for dinner?</h2>
<p class="text-on-surface-variant text-lg">Browse your family's favorite recipes and plan your upcoming week with ease.</p>
</div>
<div class="flex items-center gap-3">
<button class="flex items-center gap-2 px-5 py-3 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors font-medium">
<span class="material-symbols-outlined text-[20px]" data-icon="filter_list">filter_list</span>
                        Filter
                    </button>
<button class="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary hover:opacity-90 transition-opacity font-semibold shadow-lg shadow-primary/10">
<span class="material-symbols-outlined text-[20px]" data-icon="add">add</span>
                        New Recipe
                    </button>
</div>
</div>
<!-- Search Bar -->
<div class="relative w-full group">
<div class="absolute inset-y-0 left-6 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors" data-icon="search">search</span>
</div>
<input class="w-full bg-surface-container-high border-none rounded-xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/60 text-lg transition-all shadow-sm" placeholder="Search by meal name, ingredient, or family tag..." type="text"/>
</div>
</section>
<!-- Category Chips -->
<div class="flex flex-wrap gap-3 mb-10">
<button class="px-6 py-2 rounded-full bg-primary text-on-primary font-medium text-sm">All Meals</button>
<button class="px-6 py-2 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors font-medium text-sm">Quick (under 30m)</button>
<button class="px-6 py-2 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors font-medium text-sm">Vegetarian</button>
<button class="px-6 py-2 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors font-medium text-sm">Family Favorites</button>
<button class="px-6 py-2 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors font-medium text-sm">Kid Approved</button>
</div>
<!-- Meal Library Bento Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<!-- Meal Card 1 -->
<div class="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
<div class="relative h-64 w-full overflow-hidden">
<img alt="Herb Roasted Chicken" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Golden herb roasted chicken with vegetables on a platter" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbrkXO-_zs4lkcWCb0gC2CuYsE20FHQSWy7Htlz-Xo6ut5To-e-z9Spu_NScxzb6WCG52Y-9Jog0OTz-vavCoJH6gvaGCLKzkaXknqPmGo-Uo7kWibQA-147oF4RZP5UrzUjY-mjz-bLSdZQ2CotCR8E3ZbzKPjS-tNvP9AQ8Fwc0POldBN0kI6Cn7qQwrD9Y1D5h28FH94x2xQdhLeURtkBp7cNyFY1DcGDWEGdOEjuK9WJLQHATaQbblCXHdlygZ_0poV7ZE2oGx"/>
<div class="absolute top-4 right-4 flex gap-2">
<button class="w-10 h-10 rounded-full glass-card flex items-center justify-center text-on-surface hover:text-error transition-colors">
<span class="material-symbols-outlined text-[20px]" data-icon="favorite">favorite</span>
</button>
</div>
</div>
<div class="p-6 flex flex-col flex-grow">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline text-xl font-bold text-on-surface">Herb Roasted Chicken</h3>
</div>
<div class="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant/15">
<div class="flex -space-x-2">
<div class="w-7 h-7 rounded-full border-2 border-surface-container-low bg-tertiary-container flex items-center justify-center text-[10px] font-bold">Dad</div>
<div class="w-7 h-7 rounded-full border-2 border-surface-container-low bg-secondary-container flex items-center justify-center text-[10px] font-bold">Mom</div>
</div>
<button class="bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                            Add to Week
                        </button>
</div>
</div>
</div>
<!-- Meal Card 2 -->
<div class="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
<div class="relative h-64 w-full overflow-hidden">
<img alt="Beef Stew" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Hearty beef stew with carrots and potatoes in a ceramic bowl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZnqIXgz9eF2bm2GayxU8p2w9lQXZSIxtTqPqqT6hGnclP5KwNtpdFfaef_F7GB3tagFAKZ-fXbkET-xSPJq1cH-kCYOm2OJB_peXZn2QivxQYHDp07rhQS_kkTtRbqCnh48KLpzbpv_p7mrWMz77puLdJa624ZOTkQmfZlgnBMFvZ5iHfuJvnPcYAFH8AHunajQMT4LTeIBGQqMy_uq6Zedp3pEy08lMSPxTG8wcMxZwx6DMD6FZHrp6p00KTdELiwrUNoAmZFRzQ"/>
<div class="absolute top-4 right-4 flex gap-2">
<button class="w-10 h-10 rounded-full glass-card flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined text-[20px]" data-icon="favorite">favorite</span>
</button>
</div>
</div>
<div class="p-6 flex flex-col flex-grow">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline text-xl font-bold text-on-surface">Beef Stew</h3>
</div>
<div class="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant/15">
<div class="flex -space-x-2">
<div class="w-7 h-7 rounded-full border-2 border-surface-container-low bg-primary-container flex items-center justify-center text-[10px] font-bold">Leo</div>
</div>
<button class="bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                            Add to Week
                        </button>
</div>
</div>
</div>
<!-- Meal Card 3 -->
<div class="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
<div class="relative h-64 w-full overflow-hidden">
<img alt="Summer Salad" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Fresh vibrant summer salad with quinoa, avocado, and lime dressing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaCn-prN4Ox486a-NpZSJjbPg2Ki2cPF08_Ks45kU7lrfDrSQuLtDkpZfiEt7TJSZ35i8dRtqQG5wB-Jh0FEwZ60Gqq-ZXU18fZs6Fv4zrLa9yAqvH4bP3QGVV2GHgMxNBvBJeaCGnG0STN9nwnDzAzq7hkMN47jDGcXzoAdKeTD324SROf9NPGfCa_0GdMBYwz0FhO0kubY0uRSi5_zrE9YF8mz1ZXOzy-xhrKu_Txt_334i7Z3Z3jgl1ymZ0cePArGQ11CN-Uar4"/>
<div class="absolute top-4 right-4 flex gap-2">
<button class="w-10 h-10 rounded-full glass-card flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined text-[20px]" data-icon="favorite">favorite</span>
</button>
</div>
</div>
<div class="p-6 flex flex-col flex-grow">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline text-xl font-bold text-on-surface">Summer Salad</h3>
</div>
<div class="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant/15">
<div class="flex -space-x-2">
<div class="w-7 h-7 rounded-full border-2 border-surface-container-low bg-secondary-container flex items-center justify-center text-[10px] font-bold">Mom</div>
<div class="w-7 h-7 rounded-full border-2 border-surface-container-low bg-tertiary-container flex items-center justify-center text-[10px] font-bold">Ava</div>
</div>
<button class="bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                            Add to Week
                        </button>
</div>
</div>
</div>
<!-- Meal Card 4 -->
<div class="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
<div class="relative h-64 w-full overflow-hidden">
<img alt="Margherita Pizza" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Homemade thin crust margherita pizza with fresh basil" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOk73qpEqG00zLwW_es6z7gs2uOLlcGUJubFn0ORybIYTRa0hoIJRXPcTLLTwzGY7iGiwziif1zEc-GD-XHJtV8zteQYXeMW8ZooKfx5HnozNt2pLvYUi9j0YB2Z_DGm2qxIUJJ0MxWKENANT-8iErYiH-Nln7jUET-rj8X3f6fINk1AYk5VVnkRdg7UbL-D2rrlglTKAOxsUUJUpMu0aQSYrH9XqN8Leo_H-em9nA396MiXY8SyWoxCqhiuNsGNszhb3wkEslK_cb"/>
<div class="absolute top-4 right-4 flex gap-2">
<button class="w-10 h-10 rounded-full glass-card flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined text-[20px]" data-icon="favorite" style="font-variation-settings: 'FILL' 1;">favorite</span>
</button>
</div>
</div>
<div class="p-6 flex flex-col flex-grow">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline text-xl font-bold text-on-surface">Homemade Pizza</h3>
</div>
<div class="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant/15">
<div class="flex -space-x-2">
<div class="w-7 h-7 rounded-full border-2 border-surface-container-low bg-primary-container flex items-center justify-center text-[10px] font-bold">Leo</div>
<div class="w-7 h-7 rounded-full border-2 border-surface-container-low bg-tertiary-container flex items-center justify-center text-[10px] font-bold">Ava</div>
</div>
<button class="bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                            Add to Week
                        </button>
</div>
</div>
</div>
<!-- Meal Card 5 -->
<div class="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
<div class="relative h-64 w-full overflow-hidden">
<img alt="Pesto Pasta" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Trofie pasta with vibrant green pesto sauce and pine nuts" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdqlqJwINKdTIiw_JzV1WP3rT6Sunjd8SfNDQ08oFhejuej42M5HxpX9KdpssJ8fJFQI5RBKBp7znxXjnep9XJO9-kXrG8maHjyOVteYx2KGVfkt8w0nAHKhGhKosI4_6F4vL6jicEwOPxGFB5s4yfeIiQqoeghI9BsLVOIXXDls_yFoKjrzfHUmVgIQ6MPX0wViuFm_6G2KE4c_3UlgBgGdV4DLXj1OZWKb-e3X7tO6Wv88rfFtvQaLYvYgNZvSkAIL7gtpLBOnxP"/>
</div>
<div class="p-6 flex flex-col flex-grow">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline text-xl font-bold text-on-surface">Walnut Pesto Pasta</h3>
</div>
<div class="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant/15">
<div class="flex -space-x-2">
<div class="w-7 h-7 rounded-full border-2 border-surface-container-low bg-secondary-container flex items-center justify-center text-[10px] font-bold">Mom</div>
</div>
<button class="bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                            Add to Week
                        </button>
</div>
</div>
</div>
<!-- Meal Card 6 (Empty/Add New State) -->
<div class="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/50 rounded-xl p-8 bg-surface-container-low/30 hover:bg-surface-container-low transition-colors group cursor-pointer h-[460px]">
<div class="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-[32px]" data-icon="add_circle">add_circle</span>
</div>
<h3 class="font-headline text-lg font-bold text-on-surface">Add a new recipe</h3>
<p class="text-on-surface-variant text-center text-sm mt-2 max-w-[200px]">Import from web or create your own family secret dish.</p>
</div>
</div>
</main>
<!-- BottomNavBar Component -->
<nav class="fixed bottom-0 w-full z-50 rounded-t-[3rem] bg-white/80 dark:bg-[#1a1c18]/80 backdrop-blur-xl shadow-2xl">
<div class="flex justify-around items-center w-full px-4 pb-6 pt-3">
<!-- Home -->
<a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#c4c8bc] px-5 py-2 hover:text-[#50662b] dark:hover:text-[#d2eca2] active:scale-90 transition-transform duration-300" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="font-['Inter'] text-[11px] font-medium tracking-wide">Home</span>
</a>
<!-- Meals (Active) -->
<a class="flex flex-col items-center justify-center bg-[#d2eca2] dark:bg-[#384d16] text-[#2d342c] dark:text-[#f0ffcf] rounded-full px-5 py-2 active:scale-90 transition-transform duration-300" href="#">
<span class="material-symbols-outlined" data-icon="restaurant" style="font-variation-settings: 'FILL' 1;">restaurant</span>
<span class="font-['Inter'] text-[11px] font-medium tracking-wide">Meals</span>
</a>
<!-- Tasks -->
<a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#c4c8bc] px-5 py-2 hover:text-[#50662b] dark:hover:text-[#d2eca2] active:scale-90 transition-transform duration-300" href="#">
<span class="material-symbols-outlined" data-icon="checklist">checklist</span>
<span class="font-['Inter'] text-[11px] font-medium tracking-wide">Tasks</span>
</a>
<!-- Family -->
<a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#c4c8bc] px-5 py-2 hover:text-[#50662b] dark:hover:text-[#d2eca2] active:scale-90 transition-transform duration-300" href="#">
<span class="material-symbols-outlined" data-icon="group">group</span>
<span class="font-['Inter'] text-[11px] font-medium tracking-wide">Family</span>
</a>
<!-- More -->
<a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#c4c8bc] px-5 py-2 hover:text-[#50662b] dark:hover:text-[#d2eca2] active:scale-90 transition-transform duration-300" href="#">
<span class="material-symbols-outlined" data-icon="more_horiz">more_horiz</span>
<span class="font-['Inter'] text-[11px] font-medium tracking-wide">More</span>
</a>
</div>
</nav>
</body></html>