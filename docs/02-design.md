<!-- Cleaned Dashboard -->
<!DOCTYPE html>

<html class="light" lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Digital Hearth - Dashboard</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap"
    rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
    rel="stylesheet" />
  <style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }

    body {
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    h1,
    h2,
    h3,
    .headline {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
  </style>
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
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>

<body class="bg-background text-on-surface min-h-screen pb-32">
  <!-- TopAppBar -->
  <header class="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-[#f8faf3] dark:bg-[#1a1c18]">
    <div class="w-10"></div> <!-- Spacer to help center the title since avatar is on the right -->
    <h1
      class="absolute left-1/2 -translate-x-1/2 text-[#50662b] dark:text-[#d2eca2] font-['Plus_Jakarta_Sans'] font-extrabold text-xl tracking-tight">
      Digital Hearth</h1>
    <div class="relative">
      <div
        class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container hover:bg-[#eaf0e5] dark:hover:bg-[#3e4a3d] transition-colors cursor-pointer">
        <img class="w-full h-full object-cover" data-alt="Portrait of a smiling user in soft lighting"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh1WlxFXJgUUoZj3TqKxQn5RPA3AJH4u6kyvC5oArbKa7pjbYdgKI25eBal_13HDMYOrfxeKLIeVyhmZTT3xCMiq1Q63CvgUZDp4ddv7ztLLbLmwI97xvWsy1E9Ps4OD6I3RXW9X6FP_j-z5MTnfdE5-QeKilCayVgiHdVtkXIhjNIbmvt7Qqyd3aLhxrdDRnMfOjL-2Y6v-ryGywM8dbuh7aRTl7di2wCAayCHtxTfjWxzCcD0zI2W8rTYRiBPyGXWGZC2vBNaqQM" />
      </div>
      <span
        class="absolute -top-1 -right-1 w-4 h-4 bg-tertiary rounded-full border-2 border-surface flex items-center justify-center text-[10px] text-on-tertiary font-bold">3</span>
    </div>
  </header>
  <main class="pt-20 px-6 space-y-8">
    <!-- Welcome Section -->
    <section class="mt-4">
      <p class="text-on-surface-variant font-medium tracking-wide">Good morning, Sarah</p>
      <h2 class="text-3xl font-extrabold text-on-surface mt-1 leading-tight">The house is <span
          class="text-primary italic">quiet</span>.</h2>
    </section>
    <!-- Tonight's Dinner - Editorial Bento Style -->
    <section>
      <div class="flex justify-between items-end mb-4">
        <h3 class="text-xl font-bold tracking-tight">Tonight's Dinner</h3>
        <span class="text-sm font-semibold text-primary underline">View Library</span>
      </div>
      <div class="relative overflow-hidden rounded-xl bg-surface-container-low shadow-sm group">
        <div class="aspect-[16/10] w-full overflow-hidden">
          <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            data-alt="Warm rustic tomato basil soup with crusty bread"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9isHZmkQJdtyrIlHC9EPwgC345it1EP2WOiCWPtLErZl_Grdi01szLEi_JIaS3L6OBcjLoVLl9vm5WI-3f4ckFzkZJAvPe0edkL9gZMKk6DdsRhclaLAFypi8hTGP4QTVkkHuXTNLTjKLoCrdLR5JKJ-SDVq57BEecmMZOF6pmjDYKycf75myyfIbm0IT1rxgBu3PArlSl5nR8URomqN38NMUhyxowHLsd-NMJdRdWUvlHpwuO2MlvLqtiTS7czIm1aMUYW_Olete" />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div class="absolute bottom-0 left-0 p-6 w-full">
          <div class="flex justify-between items-end">
            <div class="space-y-1">
              <span
                class="bg-primary-container/90 backdrop-blur-md text-on-primary-container text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Main
                Course</span>
              <h4 class="text-white text-2xl font-bold">Roasted Tomato &amp; Basil</h4>
              <p class="text-white/80 text-sm font-medium">Prep: 15m • Cook: 40m</p>
            </div>
            <button class="bg-primary text-on-primary p-4 rounded-full shadow-lg active:scale-95 transition-transform">
              <span class="material-symbols-outlined" data-icon="restaurant">restaurant</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    <!-- Tasks at a Glance - Calm Overview Section -->
    <section class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-bold tracking-tight">Tasks at a Glance</h3>
      </div>
      <div class="grid gap-3">
        <!-- Weekly Task -->
        <div
          class="bg-surface-container-low p-4 rounded-2xl flex items-center justify-between border border-outline-variant/10">
          <div class="flex items-center gap-4">
            <div class="bg-primary-container/40 p-3 rounded-full">
              <span class="material-symbols-outlined text-primary" data-icon="water_drop">water_drop</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold text-primary uppercase tracking-wider">Weekly</span>
              </div>
              <h4 class="font-bold text-on-surface">Water the Plants</h4>
            </div>
          </div>
          <button
            class="w-6 h-6 rounded-full border border-outline flex items-center justify-center hover:bg-primary-container transition-colors">
            <span class="material-symbols-outlined text-transparent text-sm" data-icon="check">check</span>
          </button>
        </div>
        <!-- Monthly Task -->
        <div
          class="bg-surface-container-low p-4 rounded-2xl flex items-center justify-between border border-outline-variant/10">
          <div class="flex items-center gap-4">
            <div class="bg-secondary-container/40 p-3 rounded-full">
              <span class="material-symbols-outlined text-secondary" data-icon="airware">airware</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold text-secondary uppercase tracking-wider">Monthly</span>
              </div>
              <h4 class="font-bold text-on-surface">HVAC Filter Check</h4>
            </div>
          </div>
          <button
            class="w-6 h-6 rounded-full border border-outline flex items-center justify-center hover:bg-primary-container transition-colors">
            <span class="material-symbols-outlined text-transparent text-sm" data-icon="check">check</span>
          </button>
        </div>
        <!-- Seasonal Task -->
        <div
          class="bg-surface-container-low p-4 rounded-2xl flex items-center justify-between border border-outline-variant/10">
          <div class="flex items-center gap-4">
            <div class="bg-tertiary-container/30 p-3 rounded-full">
              <span class="material-symbols-outlined text-tertiary" data-icon="house_siding">house_siding</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold text-tertiary uppercase tracking-wider">Seasonal</span>
              </div>
              <h4 class="font-bold text-on-surface">Clean Gutters</h4>
            </div>
          </div>
          <button
            class="w-6 h-6 rounded-full border border-outline flex items-center justify-center hover:bg-primary-container transition-colors">
            <span class="material-symbols-outlined text-transparent text-sm" data-icon="check">check</span>
          </button>
        </div>
      </div>
    </section>
    <!-- Subtle Household Pulse -->
    <section
      class="bg-secondary-container/30 rounded-xl p-6 flex items-center gap-4 border border-secondary-container/20">
      <span class="material-symbols-outlined text-secondary text-3xl"
        data-icon="energy_savings_leaf">energy_savings_leaf</span>
      <div>
        <p class="text-on-secondary-container font-bold text-sm">Household Efficiency</p>
        <p class="text-on-secondary-container/70 text-xs">Energy usage is 12% lower than last Tuesday.</p>
      </div>
    </section>
  </main>
  <!-- BottomNavBar -->
  <nav
    class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#f8faf3]/80 dark:bg-[#1a1c18]/80 backdrop-blur-xl rounded-t-[3rem] shadow-[0_-4px_20px_rgba(80,102,43,0.05)] shadow-2xl">
    <a class="flex flex-col items-center justify-center bg-[#d2eca2] dark:bg-[#50662b] text-[#2d342c] dark:text-[#f0ffcf] rounded-full px-5 py-2 transition-all active:scale-90"
      href="#">
      <span class="material-symbols-outlined" data-icon="home_app_logo"
        style="font-variation-settings: 'FILL' 1;">home_app_logo</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Home</span>
    </a>
    <a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90"
      href="#">
      <span class="material-symbols-outlined" data-icon="assignment">assignment</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Tasks</span>
    </a>
    <a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90"
      href="#">
      <span class="material-symbols-outlined" data-icon="restaurant">restaurant</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Meals</span>
    </a>
    <a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90"
      href="#">
      <span class="material-symbols-outlined" data-icon="settings">settings</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Settings</span>
    </a>
  </nav>
  <!-- Floating Quick Action Button -->
  <div class="fixed bottom-24 right-6 z-40">
    <button
      class="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-xl shadow-primary/20 active:scale-95 transition-transform">
      <span class="material-symbols-outlined text-3xl" data-icon="add">add</span>
    </button>
  </div>
</body>

</html>

<!-- Manage Tasks (with Add) -->
<!DOCTYPE html>

<html class="light" lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Household Tasks - Digital Hearth</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap"
    rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
    rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
    rel="stylesheet" />
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
  <header
    class="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#f8faf3] dark:bg-[#1a1c18] no-border bg-[#f1f5ec] dark:bg-[#2d342c] flat no-shadows">
    <div class="flex-1"></div>
    <h1
      class="text-[#50662b] dark:text-[#d2eca2] font-['Plus_Jakarta_Sans'] font-extrabold text-xl tracking-tight text-center flex-1">
      Digital Hearth</h1>
    <div class="flex-1 flex justify-end">
      <div
        class="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary-container">
        <img alt="User profile avatar" class="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxOKb8ZE_aJsQehxN4ykgiY2RXsU8jxs-NJfAAMhvTJZ2eSH8aGPQE4_lHNUrd6y-eAFQAS5URUn7kr4hTTYJvbQlHqmqV8zlYfMfK4xBKe6655-QZ7KGd9pS_LcIBZSPJfTMvdiuwRIBXYEUZ-D6QurvNa9LuIFONxZCol402GrXejiDj86XZV-vgyh5-PF_gq-dz2hdtYtXqgLhOHiYouIwpMLSLbnR1aHhaM35LRYll-zjP1rAc9wViKVsvc33k8z0pokdl3NbE" />
      </div>
    </div>
  </header>
  <main class="pt-24 px-6 max-w-md mx-auto">
    <!-- Quick Stats / Soft Nudge -->
    <div class="glass-nudge mb-10 p-5 rounded-xl flex items-center justify-between shadow-sm">
      <div class="flex flex-col">
        <span class="text-xs font-semibold uppercase tracking-widest text-secondary mb-1">Weekly Pulse</span>
        <p class="text-on-surface font-headline font-bold text-lg">4 Tasks Pending</p>
      </div>
      <div
        class="bg-primary-container text-on-primary-container rounded-full w-12 h-12 flex items-center justify-center">
        <span class="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
      </div>
    </div>
    <!-- Section: Short Term (Weekly) -->
    <section class="mb-12">
      <div class="flex items-baseline justify-between mb-6 ml-4">
        <h2 class="font-headline font-bold text-2xl text-on-surface">Weekly Rhythm</h2>
        <span class="text-sm font-medium text-on-surface-variant">Next 7 days</span>
      </div>
      <div class="space-y-6">
        <!-- Task Card 1 -->
        <div
          class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/5 cursor-pointer active:bg-surface-container-high transition-colors relative">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-headline font-bold text-lg text-on-surface">Water Indoor Plants</h3>
              <p class="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                <span class="material-symbols-outlined text-sm" data-icon="event_repeat">event_repeat</span>
                Every 1 Week
              </p>
            </div>
            <span class="material-symbols-outlined text-on-surface-variant/30">chevron_right</span>
            <div class="text-right">
              <span class="text-xs font-bold text-tertiary bg-tertiary-container/20 px-2 py-1 rounded-full">Due in
                2d</span>
            </div>
          </div>
          <div class="w-full bg-surface-container rounded-full h-1.5 mb-6 overflow-hidden">
            <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" class="bg-primary h-full w-[70%]"
              role="progressbar"></div>
          </div>
          <button
            class="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <span class="material-symbols-outlined" data-icon="check_circle">check_circle</span>
            Complete Task
          </button>
        </div>
        <!-- Task Card 2 -->
        <div
          class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/5 cursor-pointer active:bg-surface-container-high transition-colors relative">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-headline font-bold text-lg text-on-surface">Compost Turn</h3>
              <p class="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                <span class="material-symbols-outlined text-sm" data-icon="event_repeat">event_repeat</span>
                Every 1 Week
              </p>
            </div>
            <span class="material-symbols-outlined text-on-surface-variant/30">chevron_right</span>
            <div class="text-right">
              <span class="text-xs font-bold text-primary bg-primary-container px-2 py-1 rounded-full">Due Today</span>
            </div>
          </div>
          <div class="w-full bg-surface-container rounded-full h-1.5 mb-6 overflow-hidden">
            <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="95" class="bg-error-container h-full w-[95%]"
              role="progressbar"></div>
          </div>
          <button
            class="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <span class="material-symbols-outlined" data-icon="check_circle">check_circle</span>
            Complete Task
          </button>
        </div>
      </div>
    </section>
    <!-- Section: Medium Term (Monthly) -->
    <section class="mb-12">
      <div class="flex items-baseline justify-between mb-6 ml-4">
        <h2 class="font-headline font-bold text-2xl text-on-surface">Monthly Care</h2>
        <span class="text-sm font-medium text-on-surface-variant">Every 30 days</span>
      </div>
      <div class="space-y-6">
        <div
          class="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 cursor-pointer active:bg-surface-container-high transition-colors relative">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-headline font-bold text-lg text-on-surface">HVAC Filter Swap</h3>
              <p class="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                <span class="material-symbols-outlined text-sm" data-icon="calendar_month">calendar_month</span>
                Every 1 Month
              </p>
            </div>
            <span class="material-symbols-outlined text-on-surface-variant/30">chevron_right</span>
            <div class="text-right">
              <span class="text-xs font-bold text-on-surface-variant bg-surface-variant px-2 py-1 rounded-full">12d
                Left</span>
            </div>
          </div>
          <div class="flex items-center gap-3 text-sm text-on-surface-variant mb-6 italic">
            <span class="material-symbols-outlined text-sm" data-icon="history">history</span>
            Last: June 12 by Sarah
          </div>
          <button
            class="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-primary/5">
            <span class="material-symbols-outlined" data-icon="task_alt">task_alt</span>
            Mark Done
          </button>
        </div>
      </div>
    </section>
    <!-- Section: Long Term (Seasonal) -->
    <section class="mb-12">
      <div class="flex items-baseline justify-between mb-6 ml-4">
        <h2 class="font-headline font-bold text-2xl text-on-surface">Seasonal Anchor</h2>
        <span class="text-sm font-medium text-on-surface-variant">Half-Yearly</span>
      </div>
      <div class="grid grid-cols-1 gap-6">
        <!-- Bento Style Card -->
        <div class="bg-primary-container/30 p-8 rounded-xl relative overflow-hidden group">
          <div class="relative z-10">
            <div
              class="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold mb-4">
              <span class="material-symbols-outlined text-[14px]" data-icon="flare">flare</span>
              SPRING / AUTUMN
            </div>
            <h3 class="font-headline font-extrabold text-2xl text-on-surface mb-2">Deep Clean Gutters</h3>
            <p class="text-on-surface-variant mb-8 max-w-[200px]">Crucial for preventing foundation moisture.</p>
            <div class="flex items-center justify-between">
              <div class="flex flex-col">
                <span class="text-[10px] uppercase tracking-tighter text-on-surface-variant">Frequency</span>
                <span class="text-sm font-bold text-on-surface">Every 6 Months</span>
              </div>
              <button
                class="bg-on-surface text-surface px-6 py-3 rounded-full font-bold shadow-lg active:scale-90 transition-transform">
                Complete
              </button>
            </div>
          </div>
          <!-- Decorative Background Element -->
          <span
            class="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-primary/5 rotate-12 pointer-events-none"
            data-icon="eco">eco</span>
        </div>
        <div
          class="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 cursor-pointer active:bg-surface-container-high transition-colors relative">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-headline font-bold text-lg text-on-surface">Smoke Alarm Battery</h3><span
                class="material-symbols-outlined absolute top-6 right-6 text-on-surface-variant/30">chevron_right</span>
              <p class="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                <span class="material-symbols-outlined text-sm" data-icon="verified">verified</span>
                Every 6 Months
              </p>
            </div>
            <div
              class="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center">
              <span class="text-[10px] font-bold">85%</span>
            </div>
          </div>
          <button
            class="mt-6 w-full bg-surface-container-high text-on-surface-variant py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <span class="material-symbols-outlined" data-icon="history">history</span>
            View History
          </button>
        </div>
      </div>
    </section>
  </main>
  <!-- BottomNavBar -->
  <nav
    class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#f8faf3]/80 dark:bg-[#1a1c18]/80 backdrop-blur-xl docked full-width bottom-0 rounded-t-[3rem] no-border shadow-[0_-4px_20px_rgba(80,102,43,0.05)] shadow-2xl">
    <a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90 transition-transform"
      href="#">
      <span class="material-symbols-outlined" data-icon="home_app_logo">home_app_logo</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Home</span>
    </a>
    <a class="flex flex-col items-center justify-center bg-[#d2eca2] dark:bg-[#50662b] text-[#2d342c] dark:text-[#f0ffcf] rounded-full px-5 py-2 transition-all active:scale-90"
      href="#">
      <span class="material-symbols-outlined" data-icon="assignment"
        style="font-variation-settings: 'FILL' 1;">assignment</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Tasks</span>
    </a>
    <a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90 transition-transform"
      href="#">
      <span class="material-symbols-outlined" data-icon="restaurant">restaurant</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Meals</span>
    </a>
    <a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90 transition-transform"
      href="#">
      <span class="material-symbols-outlined" data-icon="settings">settings</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Settings</span>
    </a>
  </nav>
  <button
    class="fixed bottom-28 right-6 w-14 h-14 bg-[#6B8E6B] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all z-40">
    <span class="material-symbols-outlined text-3xl">add</span>
  </button>
</body>

</html>

<!-- Cleaned Meal Planner -->
<!DOCTYPE html>

<html class="light" lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Meal Planner - Digital Hearth</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap"
    rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
    rel="stylesheet" />
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
      color: #2d342c;
    }

    h1,
    h2,
    h3 {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }

    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  </style>
  <style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>

<body class="min-h-screen pb-32">
  <!-- TopAppBar -->
  <header
    class="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#f1f5ec] dark:bg-[#2d342c] no-border flat no-shadows">
    <div class="flex items-center flex-1 justify-center">
      <div class="flex flex-col">
        <h1
          class="font-['Plus_Jakarta_Sans'] font-extrabold text-xl text-[#50662b] dark:text-[#d2eca2] leading-none text-center">
          Weekly Meals</h1>
        <p class="text-[10px] font-semibold tracking-wider text-[#596158] uppercase text-center">Oct 23 — Oct 29</p>
      </div>
    </div>
    <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
      <img class="w-full h-full object-cover" data-alt="User profile avatar showing a smiling woman"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMq0Vs3a8LFSRkcO7bDgnRHmInSE4gI_242vVAwTmG50-AObJ_b2phc-uccDEPxrEGq3S6s1aaXh0CiiFS36Kd4ulP07ownaBj8WxQYhGEbW1hQOiRP6rrh2idmGp9lVnx8C20vZFuE1OIkiG9ZdCLkQHugOOhArQ_CIj-xE_Wgb0bXtNQy4I4z9GfhPb3AFCclrkyo_9aD7IcUO15TZuc0NOSnDBmUcleXvjjBAxIcgyT5mbsxPNKnc68jkVIGjOqdDYWO0cu2UB_" />
    </div>
  </header>
  <!-- Main Content -->
  <main class="pt-24 px-6 max-w-2xl mx-auto space-y-8">
    <!-- Quick Add Section -->
    <section class="bg-surface-container rounded-xl p-5 shadow-sm border border-outline-variant/10">
      <label class="block text-on-surface font-headline font-bold text-sm mb-3">What's cooking?</label>
      <div class="relative group">
        <input
          class="w-full bg-surface-container-high border-none rounded-xl py-4 pl-4 pr-12 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          placeholder="Marry Me Chicken" type="text" />
        <button
          class="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-on-primary p-2 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <span class="material-symbols-outlined" data-icon="add">add</span>
        </button>
      </div>
      <!-- Contextual Nudge -->
      <div
        class="mt-4 flex items-center justify-between bg-secondary-container/80 backdrop-blur-md p-3 rounded-2xl border border-on-secondary-container/5">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-on-secondary-container text-xl" data-icon="auto_awesome"
            style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
          <p class="text-xs font-semibold text-on-secondary-container leading-tight">Save "Marry Me Chicken" to Library?
          </p>
        </div>
        <div class="flex gap-2">
          <button
            class="text-[10px] font-bold px-3 py-1.5 bg-white/40 hover:bg-white/60 rounded-full transition-colors">Not
            now</button>
          <button
            class="text-[10px] font-bold px-3 py-1.5 bg-primary text-on-primary rounded-full shadow-sm hover:opacity-90 transition-opacity">Save</button>
        </div>
      </div>
    </section>
    <!-- Meals for the Week List -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="font-headline font-bold text-lg text-on-surface">Meals for the Week</h2>
        <span class="text-[10px] font-bold text-on-surface-variant/60 tracking-widest uppercase">4 Planned</span>
      </div>
      <div class="space-y-3">
        <!-- Meal Item 1 -->
        <div
          class="bg-surface-container-lowest rounded-xl p-4 flex items-center justify-between shadow-sm border border-outline-variant/5 group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-lg overflow-hidden bg-surface-container">
              <img class="w-full h-full object-cover" data-alt="Fresh salmon salad bowl with greens"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8DGewsF0I1MkgRrGE8t8cNZlJD6qA7zTHXJ9x8_QOeBiHzaH10bcTec4BHBwTUgZPm6QjIMmcOha8nk9kXSBuqhV8smsrNHPvhpXEEZ4ry02LhTZFZ7SDOvtZzoc0NBFYpKRhYBs8z4t0EYHTiqWiooaiCegqudpgcyCf_TjNSeHPun7pATR2PHVy2Zq82iMZRX6u7eMrRKyCv8JXz0kQcUkYaQ356G7S_EJbgUIVzesB5KKxDhBWanVvWDUeVtcHGoxT01Ilg6Ug" />
            </div>
            <div>
              <p class="font-headline font-bold text-on-surface">Lemon Garlic Salmon</p>
              <p class="text-xs text-on-surface-variant">Selected from Library</p>
            </div>
          </div>
          <button
            class="p-2 text-outline-variant hover:text-error transition-colors rounded-full hover:bg-error-container/10">
            <span class="material-symbols-outlined text-lg" data-icon="close">close</span>
          </button>
        </div>
        <!-- Meal Item 2 -->
        <div
          class="bg-surface-container-lowest rounded-xl p-4 flex items-center justify-between shadow-sm border border-outline-variant/5 group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-lg overflow-hidden bg-surface-container">
              <img class="w-full h-full object-cover" data-alt="Vibrant mediterranean Buddha bowl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfEDDSGqD-3hrepx2inlJjuR4C4WUT6E9t9PSHs_1WENBUoEH9CtfQcSKr8GZ_zuZFJ8bEGkheEtBcM8lJe2fOX1AOULfZ4wGPgtkDVDnxkcBlKhxlmRUunbZj1-HclRvEXn-HF-EzbhGZYNN5gM3bSNKURSx-aMsty2IE1bK-c5a6vouO84X-2dPH1-sHkXvwiesHLo26OPcmqk1I9CgUqKPBhT_xoEwwhuCArZB9nycAAwC_Jq15_Fqj_hV3IU846D_86uj0gqhB" />
            </div>
            <div>
              <p class="font-headline font-bold text-on-surface">Mediterranean Bowls</p>
              <p class="text-xs text-on-surface-variant">Batch Cooking</p>
            </div>
          </div>
          <button
            class="p-2 text-outline-variant hover:text-error transition-colors rounded-full hover:bg-error-container/10">
            <span class="material-symbols-outlined text-lg" data-icon="close">close</span>
          </button>
        </div>
        <!-- Meal Item 3 (Manual) -->
        <div
          class="bg-surface-container-lowest rounded-xl p-4 flex items-center justify-between shadow-sm border border-outline-variant/5 group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-lg overflow-hidden bg-surface-container flex items-center justify-center">
              <span class="material-symbols-outlined text-on-surface-variant/40"
                data-icon="dinner_dining">dinner_dining</span>
            </div>
            <div>
              <p class="font-headline font-bold text-on-surface">Spaghetti Aglio e Olio</p>
              <p class="text-xs text-on-surface-variant">Manual entry</p>
            </div>
          </div>
          <button
            class="p-2 text-outline-variant hover:text-error transition-colors rounded-full hover:bg-error-container/10">
            <span class="material-symbols-outlined text-lg" data-icon="close">close</span>
          </button>
        </div>
        <!-- Add Placeholder -->
        <div
          class="bg-primary-container/30 border-2 border-dashed border-primary/20 rounded-xl p-6 flex flex-col items-center justify-center gap-2 group hover:bg-primary-container/50 transition-colors cursor-pointer">
          <span class="material-symbols-outlined text-primary/60" data-icon="restaurant_menu">restaurant_menu</span>
          <p class="text-xs font-bold text-primary/80">Add another meal</p>
        </div>
      </div>
    </section>
    <!-- Library Shortcuts -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-headline font-bold text-md text-on-surface">From Your Library</h3>
        <button class="text-xs font-bold text-primary flex items-center gap-1">View all <span
            class="material-symbols-outlined text-xs" data-icon="arrow_forward">arrow_forward</span></button>
      </div>
      <div class="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
        <div
          class="flex-shrink-0 w-32 bg-surface-container-low rounded-2xl p-3 border border-outline-variant/10 text-center space-y-2">
          <img class="w-16 h-16 mx-auto rounded-full object-cover" data-alt="Barbecue ribs on a wooden board"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg9SMYUGRS-kwWTsUspAYewYdPAmrcJ3yG_7I0ufiqzDndtUqBqWmXpSBzzG4pzJqBSuFXwgVGEdEJnq7T7fVem9g0nrTWmbJDEb-VmSSCkF011KIuv4Rt0FbILYmwAz4MUJaqxuNCx0DrZfQrWyJEpoxsWzYb3EjKGZAFMCyq27WQyXKyjciTZfzxnqTJ7XWCCQ5Fqj54fEShDObfETRXSzuFv5BuiHFdUDUiUWquaaQMIYQASTgfEX5kqNh8HpiOdkAdZTUTmbKr" />
          <p class="text-[10px] font-bold text-on-surface leading-tight">BBQ Ribs</p>
        </div>
        <div
          class="flex-shrink-0 w-32 bg-surface-container-low rounded-2xl p-3 border border-outline-variant/10 text-center space-y-2">
          <img class="w-16 h-16 mx-auto rounded-full object-cover" data-alt="Pepperoni pizza slice with melted cheese"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIlVCKK4TqPZ95mkXqRN36tNh-3H9WNsOVYi03656cMgkSyYEjOCJOs7dXTdJbi-gzgvh88XPIOxBCOyvkRX9VEdjsDxNguMo5QvaUBvoockbjW_fq1ioJr4LdGMMMYCcMHfzRRFVoipVdKPf-Fp2cF8fwQvi3w2qUfVIOAxRJpJoYdlp1XkPANs71jcJlhSQ6AdkVr8Kit1hSIDZljlZW8ZuCS-UU0Z8E-Fcd-jMOdJRyxDozHXqVac9_VrDDhBp5Mpc4xq3nhRR-" />
          <p class="text-[10px] font-bold text-on-surface leading-tight">Homemade Pizza</p>
        </div>
        <div
          class="flex-shrink-0 w-32 bg-surface-container-low rounded-2xl p-3 border border-outline-variant/10 text-center space-y-2">
          <img class="w-16 h-16 mx-auto rounded-full object-cover" data-alt="Fresh garden salad with vinaigrette"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs9_wegAMO_rGpbvXeQzc5ldKJ24ezpkXhHcYQxctnnREKu4kza9RivyrJPHRr_Ccv7xU5m32gjSQZVbHUU5pH0_4Krijkt0ynDyASdRo10Wf8fRLnsyQ49Y4DPlA-hm9tZxHpMCPq9ZyQN1oIg85sE4641PX9t4OSkyQHJz6gg6QfPPvv0EnlMhXURAMEYXXoQoXcNYdaGzIr6iDmeIjmFhMgGRpe74Ga8iyFPS4-QCymQb3kTSGC7v1gDpIwuonS1azxtuYQ659A" />
          <p class="text-[10px] font-bold text-on-surface leading-tight">Garden Bowl</p>
        </div>
      </div>
    </section>
  </main>
  <!-- BottomNavBar -->
  <nav
    class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#f8faf3]/80 dark:bg-[#1a1c18]/80 backdrop-blur-xl docked full-width rounded-t-[3rem] no-border shadow-[0_-4px_20px_rgba(80,102,43,0.05)] shadow-2xl">
    <a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90"
      href="#">
      <span class="material-symbols-outlined mb-1" data-icon="home_app_logo">home_app_logo</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Home</span>
    </a>
    <a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90"
      href="#">
      <span class="material-symbols-outlined mb-1" data-icon="assignment">assignment</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Tasks</span>
    </a>
    <a class="flex flex-col items-center justify-center bg-[#d2eca2] dark:bg-[#50662b] text-[#2d342c] dark:text-[#f0ffcf] rounded-full px-5 py-2 transition-all active:scale-90"
      href="#">
      <span class="material-symbols-outlined mb-1" data-icon="restaurant"
        style="font-variation-settings: 'FILL' 1;">restaurant</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Meals</span>
    </a>
    <a class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90"
      href="#">
      <span class="material-symbols-outlined mb-1" data-icon="settings">settings</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide">Settings</span>
    </a>
  </nav>
</body>

</html>

<!-- Edit Task -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>Edit Task - Digital Hearth</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap"
    rel="stylesheet">
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
    rel="stylesheet">
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
    rel="stylesheet">
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
            "on-secondary": "#f6f9ff",
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
      color: #2d342c;
    }

    .editorial-shadow {
      box-shadow: 0 4px 24px rgba(80, 102, 43, 0.06);
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
  <header
    class="fixed top-0 w-full z-50 bg-[#f8faf3]/80 backdrop-blur-xl flex justify-between items-center px-6 py-4 w-full">
    <div class="flex items-center gap-4">
      <button class="text-[#50662b] hover:bg-[#eaf0e5] p-2 rounded-full transition-colors active:scale-95 duration-200"
        style="">
        <span class="material-symbols-outlined" style="">close</span>
      </button>
      <h1 class="font-headline font-black text-[#50662b] tracking-tight text-lg" style="">Digital Hearth</h1>
    </div>
    <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
      <img alt="user profile avatar" class="w-full h-full object-cover" data-alt="Close up portrait of a smiling woman"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCirwDdnd4QYGrGA_N2obFGbMzaypfF0JFLQeCOcY4bZIYwM2SK_jcGyIJEegecZ_Isq3DBOBgXwbAyX08gv2AqggB5Iyw6SBmCBvvV1vsOBTyHNygPG78wFY38y2imNFKAkRXqYxKsgUUGiXC4tcY5e2X11Bh5K4s3YE0qBIzsOeRd4LDKa9MHjqBL3Zio6P_HTfS_gMn1eOQNQ9qUuMCAWmxK4Qo8b1Dfjd8L7lXqLZFMKtx1USRwlyieJgcw--YzvUFA-neHx1y"
        style="">
    </div>
  </header>
  <main class="pt-24 px-6 max-w-2xl mx-auto">
    <!-- Editorial Header -->
    <header class="mb-12">
      <span class="text-primary font-semibold tracking-widest text-xs uppercase mb-2 block" style="">Task
        Management</span>
      <h2 class="font-headline text-4xl font-extrabold text-on-surface leading-tight tracking-tight" style="">
        Edit Household <br>Task
      </h2>
    </header>
    <!-- Form Section -->
    <div class="space-y-8">
      <!-- Task Name Input -->
      <div class="space-y-3">
        <label class="font-headline font-bold text-on-surface-variant text-sm ml-1" style="">Task Name</label>
        <div
          class="bg-surface-container-high rounded-xl p-1 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <input
            class="w-full bg-transparent border-none focus:ring-0 px-5 py-4 text-on-surface font-medium text-lg placeholder:text-outline-variant"
            placeholder="What needs to be done?" type="text" value="Water Indoor Plants">
        </div>
      </div>
      <!-- Recurrence Tier Selection -->
      <div class="space-y-4">
        <label class="font-headline font-bold text-on-surface-variant text-sm ml-1" style="">Recurrence Tier</label>
        <div class="grid grid-cols-3 gap-3">
          <!-- Long Tier -->
          <button
            class="flex flex-col items-center justify-center p-5 rounded-lg bg-surface-container-low border-2 border-transparent hover:bg-surface-container-high transition-all"
            style="">
            <span class="material-symbols-outlined text-secondary mb-2" data-icon="auto_awesome_motion"
              style="">auto_awesome_motion</span>
            <span class="font-headline font-bold text-sm text-on-surface" style="">Long</span>
          </button>
          <!-- Medium Tier (Active) -->
          <button
            class="flex flex-col items-center justify-center p-5 rounded-lg bg-primary-container border-2 border-primary/20 shadow-sm transition-all scale-105"
            style="">
            <span class="material-symbols-outlined text-primary mb-2" data-icon="waves"
              style="font-variation-settings: &quot;FILL&quot; 1;">waves</span>
            <span class="font-headline font-bold text-sm text-primary" style="">Medium</span>
          </button>
          <!-- Short Tier -->
          <button
            class="flex flex-col items-center justify-center p-5 rounded-lg bg-surface-container-low border-2 border-transparent hover:bg-surface-container-high transition-all"
            style="">
            <span class="material-symbols-outlined text-secondary mb-2" data-icon="bolt" style="">bolt</span>
            <span class="font-headline font-bold text-sm text-on-surface" style="">Short</span>
          </button>
        </div>
      </div>
      <!-- Interval Input -->
      <div class="space-y-3">
        <label class="font-headline font-bold text-on-surface-variant text-sm ml-1" style="">Interval</label>
        <div class="flex items-center bg-surface-container-high rounded-xl p-1 gap-2">
          <div class="flex-1 px-5 py-4">
            <span class="text-on-surface font-medium" style="">Every</span>
          </div>
          <div class="flex-[2] bg-surface-container-lowest rounded-lg">
            <select
              class="w-full bg-transparent border-none focus:ring-0 px-4 py-4 text-on-surface font-bold text-center">
              <option>1 Week</option>
              <option>2 Weeks</option>
              <option>1 Month</option>
              <option>3 Days</option>
            </select>
          </div>
        </div>
      </div>
      <!-- Visual Context Card (Editorial domesticity touch) -->
      <div class="relative overflow-hidden rounded-xl bg-surface-container h-48 flex items-end p-6 mt-8">
        <div class="absolute inset-0 opacity-40 mix-blend-multiply">
          <img alt="indoor plants background" class="w-full h-full object-cover"
            data-alt="A lush green monstera plant in a ceramic pot"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo54gQZMt7o--_d-QfXJFZD9lUcjOX_jwUlEfn4o-Utr37XkR9Si2vPHWQz-Chm_Dhvg1UbTCFK_8IMR8qm9Pgu1E85aIlR4l2NulCBxuhuKoVQlGM5YDkJVJ2eHtFKTZgAudaqfUjkw7vBRASoNU8pdLvZo1d_gzeHvnL-QGbXEJmWlJnWptYmgbnn702pSwxeXirSXBauBmwHgb-1I_3qQOn4zBVt-JNwg6tRV1OD-SfU55LziPIF1lEgw4Ekl3mZbQLE0fuIWrY"
            style="">
        </div>
        <div
          class="relative z-10 bg-white/80 backdrop-blur-md p-4 rounded-lg flex items-center gap-4 editorial-shadow max-w-xs">
          <div class="bg-primary-container p-2 rounded-full">
            <span class="material-symbols-outlined text-primary" data-icon="opacity" style="">opacity</span>
          </div>
          <div>
            <p class="text-[10px] text-primary font-bold uppercase tracking-wider" style="">Upcoming</p>
            <p class="text-sm font-headline font-bold text-on-surface leading-tight" style="">Next session: Saturday
              Morning</p>
          </div>
        </div>
      </div>
      <!-- Action Buttons -->
      <div class="pt-8 space-y-4">
        <button
          class="w-full py-5 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-extrabold text-lg shadow-xl shadow-primary/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          style="">
          <span class="material-symbols-outlined text-xl" data-icon="check_circle" style="">check_circle</span>
          Save Changes
        </button>
        <button
          class="w-full py-4 rounded-xl text-error font-body font-semibold text-sm hover:bg-error/5 transition-colors flex items-center justify-center gap-2"
          style="">
          <span class="material-symbols-outlined text-lg" data-icon="delete" style="">delete</span>
          Delete Task
        </button>
      </div>
    </div>
  </main>
  <!-- Navigation Suppressed for Focused Task Editing Journey as per Shell Visibility Rule -->
</body>

</html>

<!-- Cleaned Settings -->
<!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Digital Hearth - Household Settings</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap"
    rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&amp;display=swap"
    rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
    rel="stylesheet" />
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
      color: #2d342c;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  </style>
  <style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>

<body class="bg-surface text-on-surface antialiased min-h-screen pb-32">
  <!-- TopAppBar -->
  <header
    class="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#f8faf3] dark:bg-[#1a1c18] font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight no-border bg-[#f1f5ec] dark:bg-[#2d342c] flat no-shadows">
    <div class="w-10"></div>
    <h1
      class="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#50662b] dark:text-[#d2eca2] absolute left-1/2 -translate-x-1/2 text-center">
      Household Settings</h1>
    <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
      <img alt="User Profile" class="w-full h-full object-cover" data-alt="Close up of a smiling man portrait"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuVaUtASwE01Zl2P0zpLaFbcoKlA1bMSJQ6P0PKFGM0N_OdFndfcrE96at9jGPxkUBu_LnUtfazBlrUNze14fUh6mtZ3Tl9xDyW9WOdTKR8L2TMieAhHF8u6fpVOr6pgDGCHF8bsyrDp-9Y1dvC-44yiluBoGomp9Atr38ZkCc7oVJWWWfBKpMmu73bLcxwTPykmzoydCCTle0aoZbwvxuTtHxx2c6YKK86a92qFmwFsqD3xvzBBCfK3spxBp2UOgptY0cfWZiyatI" />
    </div>
  </header>
  <main class="pt-24 px-6 space-y-10 max-w-2xl mx-auto">
    <!-- Household Members Section -->
    <section class="space-y-4">
      <div class="flex items-center justify-between mb-2">
        <h2 class="font-headline font-bold text-xl text-on-surface">Household Members</h2>
        <button
          class="text-primary font-semibold text-sm flex items-center gap-1 bg-primary-container/30 px-4 py-2 rounded-full hover:bg-primary-container/50 transition-colors">
          <span class="material-symbols-outlined text-lg">share</span>
          Invite Code
        </button>
      </div>
      <div class="space-y-3">
        <!-- Member Card -->
        <div
          class="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
              <img class="w-full h-full object-cover" data-alt="Professional woman smiling for profile picture"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATdJG1LVVa0iAU_eUY8POd9h_HZedrb6YNWkiMpALK5qG41EmU0tjfa4GMB200CkgrK9Lm6JrliZvVppdhVMzNqRSRuPiWBhG1MZIWlEvIpE5vUQrlhtW4HkwYuKBXkdogmoBly9LMuzqCLKih9tybZkfArYvCpHf-hME9vk8GZ_HcWh5fLAc9vdRlPL-XF6RRI_W2Sp6BIWalNkF_RFn7PVRFPLp2LVEAvWKSS4S3L1k6E4i_QtGDcJGqndpdJhLtgG5U0tl6-Ihk" />
            </div>
            <div>
              <p class="font-bold text-on-surface">Sarah Mitchell</p>
              <p class="text-sm text-on-surface-variant">Household Admin</p>
            </div>
          </div>
          <span class="text-xs font-bold px-2 py-1 bg-primary-container text-on-primary-container rounded-md">YOU</span>
        </div>
        <!-- Member Card -->
        <div
          class="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
              <img class="w-full h-full object-cover" data-alt="Portrait of a young man with glasses"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb3N3ISm2065gsIUhkxtcV7Ls1sGkRElpJBlUY_fcW64vUB01u1BT6pt-LSlT5VK9_MDHuTje-8dcYKixEI4GIV_iOz0eQyO6iA_XOp2AwaOmsbGeSwjIDjrEJvLbZCUSqszOMPbwtl3Lqp1WHREB4zq7aHo4umIwU6SC0HBkRpuzrQ9ZM3fKG2GDtVFho_u2UyvMAKdL3UMyFQFV_bAWfpkYKtUlHAAVtZzjRrG7oT62qDLK7z2J80N-KCouFpGyObX5oVvVSS_Mk" />
            </div>
            <div>
              <p class="font-bold text-on-surface">James Wilson</p>
              <p class="text-sm text-on-surface-variant">Member</p>
            </div>
          </div>
          <button
            class="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors">more_vert</button>
        </div>
      </div>
    </section>
    <!-- General Settings Section -->
    <section class="space-y-4">
      <h2 class="font-headline font-bold text-xl text-on-surface">General Settings</h2>
      <div class="bg-surface-container rounded-xl overflow-hidden">
        <div
          class="p-4 flex items-center justify-between hover:bg-surface-container-high transition-colors cursor-pointer border-b border-outline-variant/10">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary">calendar_month</span>
            <span class="font-medium">Week Start Day</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-on-surface-variant text-sm">Monday</span>
            <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </div>
        </div>
        <div
          class="p-4 flex items-center justify-between hover:bg-surface-container-high transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary">language</span>
            <span class="font-medium">Language &amp; Region</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-on-surface-variant text-sm">English (US)</span>
            <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </div>
        </div>
      </div>
    </section>
    <!-- Notification Preferences Section -->
    <section class="space-y-4">
      <h2 class="font-headline font-bold text-xl text-on-surface">Notification Preferences</h2>
      <div class="space-y-3">
        <!-- Toggle Item -->
        <div class="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
          <div class="flex flex-col">
            <span class="font-bold">Meal Prep Reminders</span>
            <span class="text-xs text-on-surface-variant">Alerts 2 hours before scheduled meal</span>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input checked="" class="sr-only peer" type="checkbox" />
            <div
              class="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary">
            </div>
          </label>
        </div>
        <!-- Toggle Item -->
        <div class="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
          <div class="flex flex-col">
            <span class="font-bold">Task Assignments</span>
            <span class="text-xs text-on-surface-variant">When someone assigns you a chore</span>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input checked="" class="sr-only peer" type="checkbox" />
            <div
              class="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary">
            </div>
          </label>
        </div>
        <!-- Toggle Item -->
        <div class="flex items-center justify-between p-4 bg-surface-container-low rounded-xl opacity-60">
          <div class="flex flex-col">
            <span class="font-bold">Completed Tasks</span>
            <span class="text-xs text-on-surface-variant">When a family member finishes a task</span>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input class="sr-only peer" type="checkbox" />
            <div
              class="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary">
            </div>
          </label>
        </div>
      </div>
    </section>
    <!-- Auth/PIN management -->
    <section class="space-y-4">
      <h2 class="font-headline font-bold text-xl text-on-surface">Security</h2>
      <div class="bg-surface-container-high rounded-xl p-6 relative overflow-hidden">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
        <div class="relative z-10 flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary scale-125">lock_person</span>
            <div>
              <p class="font-bold">Privacy Lock</p>
              <p class="text-sm text-on-surface-variant">Manage your 4-digit household access PIN</p>
            </div>
          </div>
          <button
            class="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
            Change Access PIN
          </button>
        </div>
      </div>
    </section>
    <!-- Danger Zone -->
    <section class="pt-6">
      <button
        class="w-full p-4 rounded-xl border-2 border-error/20 text-error font-bold flex items-center justify-center gap-2 hover:bg-error/5 transition-colors">
        <span class="material-symbols-outlined">logout</span>
        Leave Household
      </button>
      <p class="text-center text-xs text-on-surface-variant mt-4 font-medium italic">Version 2.4.0 • Digital Hearth</p>
    </section>
  </main>
  <!-- BottomNavBar -->
  <nav
    class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#f8faf3]/80 dark:bg-[#1a1c18]/80 backdrop-blur-xl docked full-width bottom-0 rounded-t-[3rem] no-border shadow-[0_-4px_20px_rgba(80,102,43,0.05)] shadow-2xl">
    <div
      class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90 transition-transform">
      <span class="material-symbols-outlined" data-icon="home_app_logo">home_app_logo</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide mt-1">Home</span>
    </div>
    <div
      class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90 transition-transform">
      <span class="material-symbols-outlined" data-icon="assignment">assignment</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide mt-1">Tasks</span>
    </div>
    <div
      class="flex flex-col items-center justify-center text-[#596158] dark:text-[#acb4a9] px-5 py-2 hover:opacity-80 transition-opacity active:scale-90 transition-transform">
      <span class="material-symbols-outlined" data-icon="restaurant">restaurant</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide mt-1">Meals</span>
    </div>
    <div
      class="flex flex-col items-center justify-center bg-[#d2eca2] dark:bg-[#50662b] text-[#2d342c] dark:text-[#f0ffcf] rounded-full px-5 py-2 transition-all active:scale-90 transition-transform">
      <span class="material-symbols-outlined" data-icon="settings"
        style="font-variation-settings: 'FILL' 1;">settings</span>
      <span class="font-['Inter'] text-[11px] font-semibold tracking-wide mt-1">Settings</span>
    </div>
  </nav>
</body>

</html>