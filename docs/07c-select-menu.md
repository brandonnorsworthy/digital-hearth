<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Household Settings - Week Start</title>
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
              "on-surface": "#2d342c",
              "tertiary-dim": "#81412b",
              "secondary-dim": "#445564",
              "secondary-container": "#d3e4f7",
              "primary-container": "#d2eca2",
              "secondary-fixed": "#d3e4f7",
              "inverse-surface": "#0c0f0b",
              "on-tertiary-fixed": "#441302",
              "on-secondary-fixed": "#314150",
              "on-tertiary": "#fff7f5",
              "background": "#f8faf3",
              "tertiary": "#904d35",
              "outline-variant": "#acb4a9",
              "on-primary-fixed": "#32450d",
              "secondary": "#506171",
              "error-container": "#fd795a",
              "inverse-on-surface": "#9b9e98",
              "on-primary-fixed-variant": "#4d6227",
              "on-primary-container": "#43581f",
              "on-error": "#fff7f6",
              "primary": "#50662b",
              "surface-bright": "#f8faf3",
              "surface": "#f8faf3",
              "on-tertiary-container": "#602813",
              "on-background": "#2d342c",
              "on-surface-variant": "#596158",
              "surface-variant": "#dde5d9",
              "secondary-fixed-dim": "#c5d6e9",
              "primary-fixed": "#d2eca2",
              "on-tertiary-fixed-variant": "#6b301b",
              "primary-fixed-dim": "#c4de95",
              "surface-tint": "#50662b",
              "surface-dim": "#d5dcd0",
              "inverse-primary": "#e0fbaf",
              "error-dim": "#791903",
              "outline": "#757d73",
              "tertiary-fixed-dim": "#ed997d",
              "tertiary-container": "#fca689",
              "surface-container": "#eaf0e5",
              "on-secondary": "#f6f9ff",
              "primary-dim": "#455a20",
              "on-error-container": "#6e1400",
              "surface-container-low": "#f1f5ec",
              "surface-container-highest": "#dde5d9",
              "tertiary-fixed": "#fca689",
              "error": "#a73b21",
              "on-secondary-container": "#435363",
              "on-primary": "#f0ffcf",
              "on-secondary-fixed-variant": "#4d5d6d",
              "surface-container-high": "#e4eadf"
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
        }
        .editorial-header {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface min-h-screen flex flex-col">
<!-- TopAppBar -->
<header class="bg-[#f8faf3] dark:bg-[#1a1c18] flex items-center justify-between px-6 h-16 w-full fixed top-0 z-40">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-[#50662b] dark:text-[#d2eca2]">arrow_back</span>
<h1 class="font-['Plus_Jakarta_Sans'] text-2xl font-semibold tracking-tight text-[#2d342c] dark:text-[#e2e3db]">Settings</h1>
</div>
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface-variant">person</span>
</div>
</header>
<main class="flex-grow pt-20 pb-32 px-6 max-w-2xl mx-auto w-full">
<!-- Settings Content Background (Blurred/Dimmed effect as if overlay is active) -->
<section class="space-y-8 opacity-40">
<div>
<h2 class="editorial-header text-xl font-bold mb-4 ml-2">Household Preferences</h2>
<div class="bg-surface-container-low rounded-xl p-6 space-y-6">
<div class="flex items-center justify-between">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-primary">home_work</span>
<div>
<p class="font-medium">Household Name</p>
<p class="text-sm text-on-surface-variant">The Miller Hearth</p>
</div>
</div>
<span class="material-symbols-outlined text-outline">chevron_right</span>
</div>
<div class="flex items-center justify-between bg-surface-container-highest/30 p-3 -mx-3 rounded-lg">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-primary">calendar_today</span>
<div>
<p class="font-medium">Week Starts On</p>
<p class="text-sm text-on-surface-variant">Monday</p>
</div>
</div>
<span class="material-symbols-outlined text-primary">edit</span>
</div>
</div>
</div>
<div>
<h2 class="editorial-header text-xl font-bold mb-4 ml-2">Notifications</h2>
<div class="bg-surface-container-low rounded-xl p-6 space-y-6">
<div class="flex items-center justify-between">
<p class="font-medium">Daily Chores Summary</p>
<div class="w-12 h-6 bg-primary rounded-full flex items-center px-1 justify-end">
<div class="w-4 h-4 bg-on-primary rounded-full"></div>
</div>
</div>
</div>
</div>
</section>
</main>
<!-- Bottom Sheet Overlay Container -->
<div class="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-50 flex items-end justify-center">
<!-- The Bottom Sheet -->
<div class="bg-surface rounded-t-xl w-full max-w-xl shadow-2xl relative overflow-hidden transition-transform transform translate-y-0">
<!-- Sheet Handle -->
<div class="flex justify-center pt-3 pb-1">
<div class="w-12 h-1.5 bg-outline-variant/30 rounded-full"></div>
</div>
<!-- Sheet Header -->
<div class="px-8 pt-4 pb-6 flex items-center justify-between">
<h3 class="editorial-header text-2xl font-bold text-on-surface">Select Week Start Day</h3>
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-on-surface-variant">close</span>
</button>
</div>
<!-- Days List -->
<div class="px-6 pb-12 space-y-2">
<!-- Monday (Selected) -->
<button class="w-full flex items-center justify-between px-6 py-5 rounded-full bg-primary-container text-on-primary-container group transition-all active:scale-95">
<span class="font-['Inter'] font-semibold text-lg">Monday</span>
<div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary text-sm" style="font-variation-settings: 'wght' 700;">check</span>
</div>
</button>
<!-- Other Days -->
<button class="w-full flex items-center justify-between px-6 py-5 rounded-full hover:bg-surface-container-high transition-all text-on-surface group active:scale-95">
<span class="font-['Inter'] text-lg">Tuesday</span>
</button>
<button class="w-full flex items-center justify-between px-6 py-5 rounded-full hover:bg-surface-container-high transition-all text-on-surface group active:scale-95">
<span class="font-['Inter'] text-lg">Wednesday</span>
</button>
<button class="w-full flex items-center justify-between px-6 py-5 rounded-full hover:bg-surface-container-high transition-all text-on-surface group active:scale-95">
<span class="font-['Inter'] text-lg">Thursday</span>
</button>
<button class="w-full flex items-center justify-between px-6 py-5 rounded-full hover:bg-surface-container-high transition-all text-on-surface group active:scale-95">
<span class="font-['Inter'] text-lg">Friday</span>
</button>
<button class="w-full flex items-center justify-between px-6 py-5 rounded-full hover:bg-surface-container-high transition-all text-on-surface group active:scale-95">
<span class="font-['Inter'] text-lg">Saturday</span>
</button>
<button class="w-full flex items-center justify-between px-6 py-5 rounded-full hover:bg-surface-container-high transition-all text-on-surface group active:scale-95">
<span class="font-['Inter'] text-lg">Sunday</span>
</button>
</div>
</div>
</div>
<!-- BottomNavBar (Visible but under overlay) -->
<nav class="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 pb-6 pt-3 bg-[#f8faf3]/80 dark:bg-[#1a1c18]/80 backdrop-blur-xl rounded-t-[3rem] border-t border-[#acb4a9]/15 shadow-[0_-4px_24px_rgba(45,52,44,0.06)]">
<a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#8e9289] px-5 py-2 hover:text-[#50662b] dark:hover:text-[#d2eca2] transition-colors" href="#">
<span class="material-symbols-outlined">home</span>
<span class="font-['Inter'] text-[11px] font-medium tracking-wide">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#8e9289] px-5 py-2 hover:text-[#50662b] dark:hover:text-[#d2eca2] transition-colors" href="#">
<span class="material-symbols-outlined">checklist</span>
<span class="font-['Inter'] text-[11px] font-medium tracking-wide">Tasks</span>
</a>
<a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#8e9289] px-5 py-2 hover:text-[#50662b] dark:hover:text-[#d2eca2] transition-colors" href="#">
<span class="material-symbols-outlined">calendar_month</span>
<span class="font-['Inter'] text-[11px] font-medium tracking-wide">Calendar</span>
</a>
<!-- Active Tab: Settings -->
<a class="flex flex-col items-center justify-center bg-[#d2eca2] dark:bg-[#394d16] text-[#2d342c] dark:text-[#f0ffcf] rounded-full px-5 py-2 transform scale-90" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-['Inter'] text-[11px] font-medium tracking-wide">Settings</span>
</a>
</nav>
</body></html>