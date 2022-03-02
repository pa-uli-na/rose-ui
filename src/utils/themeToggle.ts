export const THEME_MODE_LOCALSTORAGE = 'themeMode'
export const THEME_LOCALSTORAGE = 'theme'

type ThemeMode = 'light' | 'dark'
type Theme = 'DEFAULT' | 'blue' | 'red' | 'green'

/** Lista trybów
 * (jasny / ciemny) */
export const ThemeModes: Record<ThemeMode, string> = {
  light: 'light',
  dark: 'dark',
}

/** Lista motywów kolorystycznych
 * (domyślny / niebieski / czerwony / zielony) */
export const Themes: Record<Theme, string> = {
  DEFAULT: 'DEFAULT',
  blue: 'blue',
  red: 'red',
  green: 'green',
}

/** Ustaw tryb JASNY */
export function setThemeModeLight() {
  console.log('setThemeModeLight')
  localStorage.setItem(THEME_MODE_LOCALSTORAGE, ThemeModes.light)
  document.documentElement.classList.remove(ThemeModes.dark)
}
/** Ustaw tryb CIEMNY */
export function setThemeModeDark() {
  console.log('setThemeModeDark')
  localStorage.setItem(THEME_MODE_LOCALSTORAGE, ThemeModes.dark)
  document.documentElement.classList.add(ThemeModes.dark)
}

/** Ustaw wybrany motyw kolorystyczny */
function setTheme(mode: string) {
  localStorage.setItem(THEME_LOCALSTORAGE, mode)
  document.documentElement.classList.add(mode)
}

export const isDarkMode = (): boolean => {
  const currentMode = localStorage.getItem(THEME_MODE_LOCALSTORAGE)
  return currentMode === ThemeModes.dark
}

/** Przełącz tryb jasny/ciemny */
export const toggleThemeMode = () => {
  const isDark = isDarkMode()
  if (isDark) setThemeModeLight()
  else setThemeModeDark()
}

/** Przełącz motyw kolorystyczny */
export const toggleTheme = () => {
  const currentTheme = localStorage.getItem(THEME_LOCALSTORAGE)

  let themeName = ''
  switch (currentTheme) {
    case Themes.red:
      themeName = 'theme-red'
      break
    case Themes.blue:
      themeName = 'theme-blue'
      break
    case Themes.green:
      themeName = 'theme-grean'
      break
    default:
      break
  }

  setTheme(themeName)
}
