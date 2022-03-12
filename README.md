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
instalacja npm
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
npm instal -D .. /rose-ui-0.0.0.tgz
```

PS. Powyżej przykładowa lokalizacja biblioteki

## Podłączenie komponentu w miejscu użycia

```sh
<script setup lang="ts">
import { RButton } z 'rose-ui'
</skrypt>
<szablon>
  <r-button>Test</r-button><br />
</szablon>
```
## Globalne podłączenie biblioteki w projekcie
Otwieramy plik 'main.ts'
```sh
import { createApp } z 'vue'
import aplikacji z './App.vue'
import {
 tworzyć
  RButton,
  RBadge,
 // ... inne komponenty
} z 'rose-ui'
import 'rose-ui/dist/style.css'
const roseUi = create({
 komponenty: [RButton, RBadge],
})
createApp(App).use(roseUi).mount('#app')
```
PS. Nie działa podpowiadanie typów :(
# Tematy
Zmiana motywu polega na dodaniu klasy wybranego motywu w nadrzędnym div, np. w indeks.html
```sh
class="theme-green"
```
