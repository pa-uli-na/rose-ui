# O projekcie

Rose UI jest to biblioteka komponentów. Zbudowana została z wykorzystaniem:

- [Vite](https://vitejs.dev/)
- [VUE3](https://v3.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tylny wiatrCSS](https://tailwindcss.com/)

Przy wsparciu:

- [Storybook](https://storybook.js.org/)

## Rekomendowana konfiguracja IDE

[VSCode] (https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (i wyłączony Vetur).

# Praca z projektu

## Uruchomienie

### Instalacja zależności

```sh
npm install
```

### Lokalne uruchomienie

```sh
npm run dev
```

### Lokalne uruchomienie storybook'a

```sh
npm run storybook
```

## Build biblioteki komponentów

```sh
npm run build
```

## Spakowanie biblioteki komponentów

Pliki pakowane są do formatu '.tgz'

```sh
pakiet npm
```

# Użycie biblioteki w innym projekcie

## Instalacja biblioteki

```sh
npm install -D ../rose-ui-0.0.0.tgz
```

PS. Powyżej przykładowa lokalizacja biblioteki

## Podłączenie komponentu w miejscu użycia

```sh
<script setup lang="ts">
import { RButton } from 'rose-ui'
</script>

<template>
  <r-button>Test</r-button>
</template>
```
## Globalne podłączenie biblioteki w projekcie

Otwieramy plik 'main.ts'

```sh
import { createApp } from 'vue'
import app from './App.vue'

import {
  RButton,
  RBadge,
  // ... inne komponenty
} from 'rose-ui'

import 'rose-ui/dist/style.css'
const roseui = create({
 components: [RButton, RBadge],
})

createApp(App).use(roseui).mount('#app')

```
PS. Nie działa podpowiadanie typów :(

# Tematy
Zmiana motywu polega na dodaniu klasy wybranego motywu w nadrzędnym div, np. w indeks.html
```sh
class="theme-green"
```
