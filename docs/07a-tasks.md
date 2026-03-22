<!-- Grouped Manage Tasks -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Household Tasks - Digital Hearth</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary-container": "#d2eca2",
                        "on-error": "#fff7f6",
                        "tertiary-container": "#fca689",
                        "inverse-on-surface": "#9b9e98",
                        "primary-fixed-dim": "#c4de95",
                        "on-tertiary": "#fff7f5",
                        "on-tertiary-fixed": "#441302",
                        "outline-variant": "#acb4a9",
                        "error-container": "#fd795a",
                        "surface-variant": "#dde5d9",
                        "surface-dim": "#d5dcd0",
                        "on-secondary-fixed": "#314150",
                        "surface-container-low": "#f1f5ec",
                        "inverse-primary": "#e0fbaf",
                        "on-background": "#2d342c",
                        "on-error-container": "#6e1400",
                        "on-primary-fixed": "#32450d",
                        "tertiary-fixed-dim": "#ed997d",
                        "surface-tint": "#50662b",
                        "secondary-fixed-dim": "#c5d6e9",
                        "tertiary-fixed": "#fca689",
                        "on-secondary-container": "#435363",
                        "surface-container-highest": "#dde5d9",
                        "on-tertiary-fixed-variant": "#6b301b",
                        "on-surface-variant": "#596158",
                        "surface-bright": "#f8faf3",
                        "inverse-surface": "#0c0f0b",
                        "secondary-fixed": "#d3e4f7",
                        "on-primary-container": "#43581f",
                        "secondary-container": "#d3e4f7",
                        "on-secondary-fixed-variant": "#4d5d6d",
                        "on-secondary": "#f6f9ff",
                        "on-surface": "#2d342c",
                        "surface": "#f8faf3",
                        "outline": "#757d73",
                        "secondary-dim": "#445564",
                        "primary": "#50662b",
                        "primary-fixed": "#d2eca2",
                        "surface-container-lowest": "#ffffff",
                        "error": "#a73b21",
                        "tertiary-dim": "#81412b",
                        "on-primary": "#f0ffcf",
                        "on-primary-fixed-variant": "#4d6227",
                        "surface-container-high": "#e4eadf",
                        "background": "#f8faf3",
                        "tertiary": "#904d35",
                        "primary-dim": "#455a20",
                        "error-dim": "#791903",
                        "surface-container": "#eaf0e5",
                        "secondary": "#506171",
                        "on-tertiary-container": "#602813"
                    },
                    fontFamily: {
                        "headline": ["Plus Jakarta Sans"],
                        "body": ["Inter"],
                        "label": ["Inter"]
                    },
                    borderRadius: { "DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px" },
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8faf3;
        }
        .editorial-headline {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .glass-nudge {
            background: rgba(211, 228, 247, 0.8);
            backdrop-filter: blur(20px);
        }
    </style>
<style>
        body {
            min-height: max(884px, 100dvh);
        }
    </style>
</head>
<body class="text-on-surface bg-background min-h-screen pb-32">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#f1f5ec] dark:bg-[#2d342c] no-border flat no-shadows">
<div class="flex-1"></div>
<h1 class="text-[#50662b] dark:text-[#d2eca2] font-['Plus_Jakarta_Sans'] font-extrabold text-xl tracking-tight text-center flex-1">Digital Hearth</h1>
<div class="flex-1 flex justify-end">
<div class="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary-container">
<img alt="User profile avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxOKb8ZE_aJsQehxN4ykgiY2RXsU8jxs-NJfAAMhvTJZ2eSH8aGPQE4_lHNUrd6y-eAFQAS5URUn7kr4hTTYJvbQlHqmqV8zlYfMfK4xBKe6655-QZ7KGd9pS_LcIBZSPJfTMvdiuwRIBXYEUZ-D6QurvNa9LuIFONxZCol402GrXejiDj86XZV-vgyh5-PF_gq-dz2hdtYtXqgLhOHiYouIwpMLSLbnR1aHhaM35LRYll-zjP1rAc9wViKVsvc33k8z0pokdl3NbE"/>
</div>
</div>
</header>
<main class="pt-24 px-6 max-w-md mx-auto">
<!-- Quick Stats / Soft Nudge -->
<div class="glass-nudge mb-8 p-5 rounded-xl flex items-center justify-between shadow-sm">
<div class="flex flex-col">
<span class="text-xs font-semibold uppercase tracking-widest text-secondary mb-1">Weekly Pulse</span>
<p class="text-on-surface font-headline font-bold text-lg">4 Tasks Pending</p>
</div>
<div class="bg-primary-container text-on-primary-container rounded-full w-12 h-12 flex items-center justify-center">
<span class="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
</div>
</div>
<!-- Task Groups -->
<div class="space-y-10">
<!-- Short Term Section -->
<section>
<div class="flex items-center gap-2 mb-4 px-1">
<span class="material-symbols-outlined text-primary" data-icon="bolt">bolt</span>
<h2 class="font-headline font-extrabold text-xl text-on-surface">Short Term</h2>
<span class="text-xs font-bold text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full ml-auto">Weekly</span>
</div>
<div class="space-y-4">
<!-- Task Card 1 -->
<div class="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/5 cursor-pointer active:bg-surface-container-high transition-colors relative">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="font-headline font-bold text-lg text-on-surface">Water Indoor Plants</h3>
<p class="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
<span class="material-symbols-outlined text-sm" data-icon="event_repeat">event_repeat</span>
                                    Every 1 Week
                                </p>
</div>
<div class="text-right">
<span class="text-xs font-bold text-tertiary bg-tertiary-container/20 px-2 py-1 rounded-full">Due in 2d</span>
</div>
</div>
<div class="w-full bg-surface-container rounded-full h-1.5 mb-5 overflow-hidden">
<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" class="bg-primary h-full w-[70%]" role="progressbar"></div>
</div>
<button class="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
<span class="material-symbols-outlined text-[20px]" data-icon="check_circle">check_circle</span>
                            Complete Task
                        </button>
</div>
<!-- Task Card 2 -->
<div class="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/5 cursor-pointer active:bg-surface-container-high transition-colors relative">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="font-headline font-bold text-lg text-on-surface">Compost Turn</h3>
<p class="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
<span class="material-symbols-outlined text-sm" data-icon="event_repeat">event_repeat</span>
                                    Every 1 Week
                                </p>
</div>
<div class="text-right">
<span class="text-xs font-bold text-primary bg-primary-container px-2 py-1 rounded-full">Due Today</span>
</div>
</div>
<div class="w-full bg-surface-container rounded-full h-1.5 mb-5 overflow-hidden">
<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="95" class="bg-error-container h-full w-[95%]" role="progressbar"></div>
</div>
<button class="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
<span class="material-symbols-outlined text-[20px]" data-icon="check_circle">check_circle</span>
                            Complete Task
                        </button>
</div>
</div>
</section>
<!-- Medium Term Section -->
<section>
<div class="flex items-center gap-2 mb-4 px-1">
<span class="material-symbols-outlined text-primary" data-icon="calendar_today">calendar_today</span>
<h2 class="font-headline font-extrabold text-xl text-on-surface">Medium Term</h2>
<span class="text-xs font-bold text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full ml-auto">Monthly</span>
</div>
<div class="space-y-4">
<!-- Task Card 3 -->
<div class="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 cursor-pointer active:bg-surface-container-high transition-colors relative">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="font-headline font-bold text-lg text-on-surface">HVAC Filter Swap</h3>
<p class="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
<span class="material-symbols-outlined text-sm" data-icon="calendar_month">calendar_month</span>
                                    Every 1 Month
                                </p>
</div>
<div class="text-right">
<span class="text-xs font-bold text-on-surface-variant bg-surface-variant px-2 py-1 rounded-full">12d Left</span>
</div>
</div>
<div class="flex items-center gap-3 text-sm text-on-surface-variant mb-5 italic">
<span class="material-symbols-outlined text-sm" data-icon="history">history</span>
                            Last: June 12 by Sarah
                        </div>
<button class="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-primary/5">
<span class="material-symbols-outlined text-[20px]" data-icon="check_circle">check_circle</span>
                            Complete Task
                        </button>
</div>
</div>
</section>
<!-- Long Term Section -->
<section>
<div class="flex items-center gap-2 mb-4 px-1">
<span class="material-symbols-outlined text-primary" data-icon="hourglass_empty">hourglass_empty</span>
<h2 class="font-headline font-extrabold text-xl text-on-surface">Long Term</h2>
<span class="text-xs font-bold text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full ml-auto">6mo+</span>
</div>
<div class="space-y-4">
<!-- Task Card 4 (Bento Style) -->
<div class="bg-primary-container/30 p-6 rounded-xl relative overflow-hidden group">
<div class="relative z-10">
<h3 class="font-headline font-extrabold text-xl text-on-surface mb-1">Deep Clean Gutters</h3>
<p class="text-xs text-on-surface-variant mb-6 max-w-[220px]">Crucial for preventing foundation moisture and water damage.</p>
<div class="flex items-center justify-between">
<div class="flex flex-col">
<span class="text-[9px] uppercase tracking-tighter text-on-surface-variant font-bold">Interval</span>
<span class="text-sm font-bold text-on-surface">Every 6 Months</span>
</div>
<button class="bg-on-surface text-surface px-5 py-2.5 rounded-full font-bold shadow-lg active:scale-90 transition-transform text-sm">
                                    Complete
                                </button>
</div>
</div>
<!-- Decorative Background Element -->
<span class="material-symbols-outlined absolute -right-3 -bottom-3 text-8xl text-primary/10 rotate-12 pointer-events-none" data-icon="eco">eco</span>
</div>
<!-- Task Card 5 -->
<div class="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 cursor-pointer active:bg-surface-container-high transition-colors relative">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="font-headline font-bold text-lg text-on-surface">Smoke Alarm Battery</h3>
<p class="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
<span class="material-symbols-outlined text-sm" data-icon="verified">verified</span>
                                    Every 6 Months
                                </p>
</div>
<div class="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center bg-surface-container-lowest">
<span class="text-[10px] font-bold">85%</span>
</div>
</div>
<button class="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
<span class="material-symbols-outlined text-[20px]" data-icon="check_circle">check_circle</span>
                            Complete Task
                        </button>
</div>
</div>
</section>
</div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#f8faf3]/80 dark:bg-[#1a1c18]/80 backdrop-blur-xl docked full-width rounded-t-[3rem] no-border shadow-[0_-4px_20px_rgba(80,102,43,0.05)] shadow-2xl">
<a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="home_app_logo">home_app_logo</span>
<span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Home</span>
</a>
<a class="flex flex-col items-center justify-center bg-[#d2eca2] dark:bg-[#50662b] text-[#2d342c] dark:text-[#f0ffcf] rounded-full px-5 py-2 transition-all active:scale-90" href="#">
<span class="material-symbols-outlined" data-icon="assignment" style="font-variation-settings: 'FILL' 1;">assignment</span>
<span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Tasks</span>
</a>
<a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="restaurant">restaurant</span>
<span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Meals</span>
</a>
<a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Settings</span>
</a>
</nav>
<!-- FAB -->
<button class="fixed bottom-28 right-6 w-14 h-14 bg-[#50662b] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all z-40">
<span class="material-symbols-outlined text-3xl">add</span>
</button>
</body></html>

<!-- Task Library -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Task Library - Digital Hearth</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<!-- Icons -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "on-primary-fixed": "#32450d",
              "on-primary-container": "#43581f",
              "on-secondary-fixed-variant": "#4d5d6d",
              "tertiary-fixed": "#fca689",
              "primary-dim": "#455a20",
              "surface-dim": "#d5dcd0",
              "outline": "#757d73",
              "on-tertiary-fixed": "#441302",
              "inverse-on-surface": "#9b9e98",
              "error-dim": "#791903",
              "on-error": "#fff7f6",
              "on-secondary-fixed": "#314150",
              "secondary-dim": "#445564",
              "tertiary-fixed-dim": "#ed997d",
              "outline-variant": "#acb4a9",
              "on-tertiary-fixed-variant": "#6b301b",
              "inverse-surface": "#0c0f0b",
              "surface-bright": "#f8faf3",
              "surface-tint": "#50662b",
              "secondary-fixed-dim": "#c5d6e9",
              "tertiary": "#904d35",
              "on-background": "#2d342c",
              "surface-variant": "#dde5d9",
              "error": "#a73b21",
              "on-primary": "#f0ffcf",
              "surface-container-high": "#e4eadf",
              "on-surface": "#2d342c",
              "surface-container-highest": "#dde5d9",
              "tertiary-container": "#fca689",
              "on-secondary": "#f6f9ff",
              "surface-container-low": "#f1f5ec",
              "primary-fixed-dim": "#c4de95",
              "on-primary-fixed-variant": "#4d6227",
              "primary-container": "#d2eca2",
              "on-error-container": "#6e1400",
              "inverse-primary": "#e0fbaf",
              "error-container": "#fd795a",
              "surface-container-lowest": "#ffffff",
              "on-tertiary-container": "#602813",
              "background": "#f8faf3",
              "surface-container": "#eaf0e5",
              "surface": "#f8faf3",
              "primary-fixed": "#d2eca2",
              "tertiary-dim": "#81412b",
              "primary": "#50662b",
              "on-surface-variant": "#596158",
              "secondary-fixed": "#d3e4f7",
              "secondary-container": "#d3e4f7",
              "secondary": "#506171",
              "on-tertiary": "#fff7f5",
              "on-secondary-container": "#435363"
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
      .glass-effect {
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background font-body min-h-screen pb-32">
<!-- TopAppBar -->
<header class="w-full top-0 sticky z-40 bg-[#f8faf3] dark:bg-[#1a1c18] flex items-center justify-between px-6 py-4 w-full">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
<img alt="User profile photo" class="w-full h-full object-cover" data-alt="Close up portrait of a smiling woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE8r8SJk5DwxzSG3_PfUxnCTfG7n7o0RzmjCiX0hxz_6Tj76ukox1z_G_VWnXTJ3TVGAvF9_DT91dpGrY22omUeE1pAbo0p0Vow9efZ71WPjU6wfkCCDDr9DQUIWuNcLIbfICy3WUA44P20r7-CBfyb9-Rwq1OWonCxPfUJz9Vz5B6cu1p1bGZRPeMKE_vFARZ5rc5mXMmqFhAJlr7Udk4ZsREbeT0pIevtvO8JTQ3e7v-q5_H4Awngr4diUlxQyqnqrV8UVEmQ-1E"/>
</div>
<h1 class="text-[#50662b] dark:text-[#d2eca2] font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-xl">Digital Hearth</h1>
</div>
<button class="text-[#596158] dark:text-[#acb4a9] p-2 rounded-full hover:bg-[#e4eadf] dark:hover:bg-[#43493e] transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</button>
</header>
<main class="max-w-4xl mx-auto px-6 pt-8">
<!-- Page Header & Search -->
<div class="mb-12">
<div class="flex items-baseline justify-between mb-8">
<h2 class="font-headline font-extrabold text-4xl text-on-surface tracking-tight">Task Library</h2>
<button class="hidden md:flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/10 hover:opacity-90 transition-all active:scale-95">
<span class="material-symbols-outlined text-[20px]" data-icon="add">add</span>
<span>Add New Task</span>
</button>
</div>
<div class="relative group">
<div class="absolute inset-y-0 left-5 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="search">search</span>
</div>
<input class="w-full bg-surface-container-high border-none rounded-xl py-5 pl-14 pr-6 text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all text-lg" placeholder="Search for a chore, repair, or routine..." type="text"/>
</div>
</div>
<!-- Section: Weekly -->
<section class="mb-12">
<div class="flex items-center gap-4 mb-6 ml-2">
<div class="w-2 h-2 rounded-full bg-primary"></div>
<h3 class="font-headline font-bold text-xl text-on-surface">Short Term</h3>
<span class="text-on-surface-variant text-sm font-medium opacity-60">Weekly</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<!-- Task Card 1 -->
<div class="bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-colors duration-300">
<div class="flex items-center gap-5">
<div class="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined" data-icon="local_laundry_service">local_laundry_service</span>
</div>
<div>
<h4 class="font-semibold text-on-surface text-lg">Linens &amp; Towels</h4>
<p class="text-on-surface-variant text-sm">Every 1 Week</p>
</div>
</div>
<button class="text-outline-variant group-hover:text-primary transition-colors p-2">
<span class="material-symbols-outlined" data-icon="edit">edit</span>
</button>
</div>
<!-- Task Card 2 -->
<div class="bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-colors duration-300">
<div class="flex items-center gap-5">
<div class="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined" data-icon="recycling">recycling</span>
</div>
<div>
<h4 class="font-semibold text-on-surface text-lg">Waste Disposal</h4>
<p class="text-on-surface-variant text-sm">Every 1 Week</p>
</div>
</div>
<button class="text-outline-variant group-hover:text-primary transition-colors p-2">
<span class="material-symbols-outlined" data-icon="edit">edit</span>
</button>
</div>
</div>
</section>
<!-- Section: Monthly (Asymmetric Bento Variation) -->
<section class="mb-12">
<div class="flex items-center gap-4 mb-6 ml-2">
<div class="w-2 h-2 rounded-full bg-tertiary"></div>
<h3 class="font-headline font-bold text-xl text-on-surface">Medium Term</h3>
<span class="text-on-surface-variant text-sm font-medium opacity-60">Monthly</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
<div class="md:col-span-2 bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-colors duration-300">
<div class="flex items-center gap-5">
<div class="w-12 h-12 rounded-lg bg-tertiary-container/30 flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined" data-icon="airware">airware</span>
</div>
<div>
<h4 class="font-semibold text-on-surface text-lg">HVAC Filter Replacement</h4>
<p class="text-on-surface-variant text-sm">Every 1 Month</p>
</div>
</div>
<button class="text-outline-variant group-hover:text-tertiary transition-colors p-2">
<span class="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
<div class="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between group hover:bg-surface-container transition-colors duration-300">
<div class="flex justify-between items-start mb-4">
<div class="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-secondary">
<span class="material-symbols-outlined" data-icon="kitchen">kitchen</span>
</div>
<button class="text-outline-variant group-hover:text-secondary transition-colors">
<span class="material-symbols-outlined" data-icon="edit">edit</span>
</button>
</div>
<div>
<h4 class="font-semibold text-on-surface text-base">Deep Clean Fridge</h4>
<p class="text-on-surface-variant text-xs">Every 1 Month</p>
</div>
</div>
</div>
</section>
<!-- Section: Long Term (Seasonal) -->
<section class="mb-24">
<div class="flex items-center gap-4 mb-6 ml-2">
<div class="w-2 h-2 rounded-full bg-secondary"></div>
<h3 class="font-headline font-bold text-xl text-on-surface">Long Term</h3>
<span class="text-on-surface-variant text-sm font-medium opacity-60">Seasonal / Yearly</span>
</div>
<div class="space-y-4">
<div class="bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between border-l-4 border-secondary/20 group hover:bg-surface-container transition-colors duration-300">
<div class="flex items-center gap-5">
<div class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="roofing">roofing</span>
</div>
<div>
<h4 class="font-semibold text-on-surface text-lg">Gutter Cleaning</h4>
<p class="text-on-surface-variant text-sm">Every 6 Months • Next: Oct 2024</p>
</div>
</div>
<button class="text-outline-variant group-hover:text-on-surface transition-colors p-2">
<span class="material-symbols-outlined" data-icon="edit">edit</span>
</button>
</div>
<div class="bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between border-l-4 border-secondary/20 group hover:bg-surface-container transition-colors duration-300">
<div class="flex items-center gap-5">
<div class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="detector_smoke">detector_smoke</span>
</div>
<div>
<h4 class="font-semibold text-on-surface text-lg">Smoke Alarm Battery Check</h4>
<p class="text-on-surface-variant text-sm">Every 1 Year</p>
</div>
</div>
<button class="text-outline-variant group-hover:text-on-surface transition-colors p-2">
<span class="material-symbols-outlined" data-icon="edit">edit</span>
</button>
</div>
</div>
</section>
</main>
<!-- Floating Action Button (Mobile Only) -->
<button class="md:hidden fixed bottom-28 right-6 w-16 h-16 rounded-full bg-primary text-on-primary shadow-2xl flex items-center justify-center z-50 active:scale-90 transition-transform">
<span class="material-symbols-outlined text-[32px]" data-icon="add">add</span>
</button>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#f8faf3]/80 dark:bg-[#1a1c18]/80 backdrop-blur-xl border-t border-[#acb4a9]/15 shadow-[0_-4px_24px_rgba(80,102,43,0.06)] rounded-t-[3rem]">
<a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-6 py-2 hover:text-[#50662b] dark:hover:text-[#d2eca2] active:scale-90 transition-transform duration-200" href="#">
<span class="material-symbols-outlined mb-1" data-icon="check_circle">check_circle</span>
<span class="font-['Inter'] text-[11px] font-medium">Daily Tasks</span>
</a>
<a class="flex flex-col items-center justify-center bg-[#d2eca2] dark:bg-[#50662b] text-[#50662b] dark:text-[#f0ffcf] rounded-full px-6 py-2 active:scale-90 transition-transform duration-200" href="#">
<span class="material-symbols-outlined mb-1" data-icon="library_books">library_books</span>
<span class="font-['Inter'] text-[11px] font-medium">Library</span>
</a>
<a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-6 py-2 hover:text-[#50662b] dark:hover:text-[#d2eca2] active:scale-90 transition-transform duration-200" href="#">
<span class="material-symbols-outlined mb-1" data-icon="family_restroom">family_restroom</span>
<span class="font-['Inter'] text-[11px] font-medium">Members</span>
</a>
</nav>
</body></html>

<!-- Edit Task (Refined Interval) -->
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Edit Task - Digital Hearth</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-variant": "#dde5d9",
              "primary-fixed": "#d2eca2",
              "primary-dim": "#455a20",
              "secondary-fixed": "#d3e4f7",
              "surface-bright": "#f8faf3",
              "tertiary-fixed": "#fca689",
              "background": "#f8faf3",
              "on-tertiary-fixed-variant": "#6b301b",
              "on-surface-variant": "#596158",
              "surface-container-low": "#f1f5ec",
              "primary-fixed-dim": "#c4de95",
              "tertiary": "#904d35",
              "surface": "#f8faf3",
              "on-primary-container": "#43581f",
              "on-tertiary": "#fff7f5",
              "on-primary": "#f0ffcf",
              "surface-container": "#eaf0e5",
              "outline": "#757d73",
              "on-secondary-fixed": "#314150",
              "primary": "#50662b",
              "on-tertiary-fixed": "#441302",
              "tertiary-fixed-dim": "#ed997d",
              "error-container": "#fd795a",
              "secondary-dim": "#445564",
              "tertiary-container": "#fca689",
              "inverse-primary": "#e0fbaf",
              "on-secondary-fixed-variant": "#4d5d6d",
              "error": "#a73b21",
              "surface-tint": "#50662b",
              "on-primary-fixed-variant": "#4d6227",
              "surface-dim": "#d5dcd0",
              "on-secondary-container": "#435363",
              "on-tertiary-container": "#602813",
              "error-dim": "#791903",
              "primary-container": "#d2eca2",
              "surface-container-high": "#e4eadf",
              "surface-container-highest": "#dde5d9",
              "inverse-surface": "#0c0f0b",
              "secondary": "#506171",
              "outline-variant": "#acb4a9",
              "on-error-container": "#6e1400",
              "on-background": "#2d342c",
              "on-surface": "#2d342c",
              "tertiary-dim": "#81412b",
              "surface-container-lowest": "#ffffff",
              "secondary-fixed-dim": "#c5d6e9",
              "on-primary-fixed": "#32450d",
              "secondary-container": "#d3e4f7",
              "inverse-on-surface": "#9b9e98",
              "on-error": "#fff7f6"
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
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8faf3;
            color: #2d342c;
        }
        .editorial-shadow {
            box-shadow: 0 4px 24px rgba(80, 102, 43, 0.06);
        }
        select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2350662b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 0.75rem center;
            background-size: 1.25em;
        }
    </style>
<style>
        body {
            min-height: max(884px, 100dvh);
        }
    </style>
</head>
<body class="bg-background min-h-screen pb-12">
<!-- Top Navigation Bar (Shared Component Strategy) -->
<header class="fixed top-0 w-full z-50 bg-[#f8faf3]/80 backdrop-blur-xl flex justify-between items-center px-6 py-4">
<div class="flex items-center gap-4">
<button class="text-[#50662b] hover:bg-[#eaf0e5] p-2 rounded-full transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined">close</span>
</button>
<h1 class="font-headline font-black text-[#50662b] tracking-tight text-lg">Digital Hearth</h1>
</div>
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
<img alt="user profile avatar" class="w-full h-full object-cover" data-alt="Close up portrait of a smiling woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCirwDdnd4QYGrGA_N2obFGbMzaypfF0JFLQeCOcY4bZIYwM2SK_jcGyIJEegecZ_Isq3DBOBgXwbAyX08gv2AqggB5Iyw6SBmCBvvV1vsOBTyHNygPG78wFY38y2imNFKAkRXqYxKsgUUGiXC4tcY5e2X11Bh5K4s3YE0qBIzsOeRd4LDKa9MHjqBL3Zio6P_HTfS_gMn1eOQNQ9qUuMCAWmxK4Qo8b1Dfjd8L7lXqLZFMKtx1USRwlyieJgcw--YzvUFA-neHx1y"/>
</div>
</header>
<main class="pt-24 px-6 max-w-2xl mx-auto">
<!-- Editorial Header -->
<header class="mb-12">
<span class="text-primary font-semibold tracking-widest text-xs uppercase mb-2 block">Task Management</span>
<h2 class="font-headline text-4xl font-extrabold text-on-surface leading-tight tracking-tight">
            Edit Household <br/>Task
        </h2>
</header>
<!-- Form Section -->
<div class="space-y-8">
<!-- Task Name Input -->
<div class="space-y-3">
<label class="font-headline font-bold text-on-surface-variant text-sm ml-1">Task Name</label>
<div class="bg-surface-container-high rounded-xl p-1 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
<input class="w-full bg-transparent border-none focus:ring-0 px-5 py-4 text-on-surface font-medium text-lg placeholder:text-outline-variant" placeholder="What needs to be done?" type="text" value="Water Indoor Plants"/>
</div>
</div>
<!-- Refined Interval Input Section -->
<div class="space-y-3">
<label class="font-headline font-bold text-on-surface-variant text-sm ml-1">Frequency Schedule</label>
<div class="bg-surface-container-high rounded-xl p-2 shadow-sm">
<div class="flex items-center gap-2">
<div class="flex-[0.8] pl-4">
<span class="text-on-surface-variant font-headline font-bold text-sm uppercase tracking-wider">Every</span>
</div>
<div class="flex-1 bg-surface-container-lowest rounded-lg">
<input class="w-full bg-transparent border-none focus:ring-0 px-4 py-4 text-on-surface font-bold text-center text-lg" placeholder="1" type="number" value="1"/>
</div>
<div class="flex-[2] bg-surface-container-lowest rounded-lg">
<select class="w-full bg-transparent border-none focus:ring-0 px-4 py-4 pr-10 text-on-surface font-bold text-lg appearance-none">
<option>Day</option>
<option selected="">Week</option>
<option>Month</option>
</select>
</div>
</div>
</div>
<p class="text-xs text-outline font-medium px-2">Set how often this task should repeat.</p>
</div>
<!-- Visual Context Card (Editorial domesticity touch) -->
<div class="relative overflow-hidden rounded-xl bg-surface-container h-48 flex items-end p-6 mt-8">
<div class="absolute inset-0 opacity-40 mix-blend-multiply">
<img alt="indoor plants background" class="w-full h-full object-cover" data-alt="A lush green monstera plant in a ceramic pot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo54gQZMt7o--_d-QfXJFZD9lUcjOX_jwUlEfn4o-Utr37XkR9Si2vPHWQz-Chm_Dhvg1UbTCFK_8IMR8qm9Pgu1E85aIlR4l2NulCBxuhuKoVQlGM5YDkJVJ2eHtFKTZgAudaqfUjkw7vBRASoNU8pdLvZo1d_gzeHvnL-QGbXEJmWlJnWptYmgbnn702pSwxeXirSXBauBmwHgb-1I_3qQOn4zBVt-JNwg6tRV1OD-SfU55LziPIF1lEgw4Ekl3mZbQLE0fuIWrY"/>
</div>
<div class="relative z-10 bg-white/80 backdrop-blur-md p-4 rounded-lg flex items-center gap-4 editorial-shadow max-w-xs">
<div class="bg-primary-container p-2 rounded-full">
<span class="material-symbols-outlined text-primary" data-icon="opacity">opacity</span>
</div>
<div>
<p class="text-[10px] text-primary font-bold uppercase tracking-wider">Upcoming</p>
<p class="text-sm font-headline font-bold text-on-surface leading-tight">Next session: Saturday Morning</p>
</div>
</div>
</div>
<!-- Action Buttons -->
<div class="pt-8 space-y-4">
<button class="w-full py-5 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-extrabold text-lg shadow-xl shadow-primary/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-xl" data-icon="check_circle">check_circle</span>
                Save Changes
            </button>
<button class="w-full py-4 rounded-xl text-error font-body font-semibold text-sm hover:bg-error/5 transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-lg" data-icon="delete">delete</span>
                Delete Task
            </button>
</div>
</div>
</main>
</body></html>