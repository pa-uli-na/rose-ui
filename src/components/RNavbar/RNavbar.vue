<template>
  <header id="navbar" class="relative shadow-md select-none">
    <nav class="bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              class="
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-primary
                hover:text-primary-dark
                dark:text-primary-light
                hover:dark:text-primary-lighter
                focus:outline-none
                transition
                duration-150
                ease-in-out
              "
              aria-expanded="false"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <span class="sr-only">Open main menu</span>
              <r-icon
                v-if="!isMobileMenuOpen"
                name="fas fa-bars"
                class-name="fa-lg p-2"
              ></r-icon>
              <r-icon
                v-else
                name="fas fa-xmark"
                class-name="fa-lg p-2"
              ></r-icon>
            </button>
          </div>
          <div
            class="
              flex-1 flex
              items-center
              justify-center
              sm:items-stretch
              sm:justify-start
              h-14
            "
          >
            <div class="flex-shrink-0 flex items-center font-medium">
              <a :href="logoHref" class="flex">
                <div class="flex">
                  <img
                    v-if="imgLogo"
                    :src="imgLogo"
                    class="hidden md:block max-h-5 self-center pr-2"
                  />
                  <span
                    class="
                      self-center
                      text-lg
                      font-bold
                      text-primary
                      dark:text-primary-light
                      hover:text-primary-dark
                      dark:hover:text-primary-light
                      whitespace-nowrap
                      transition
                      duration-150
                      ease-in-out
                    "
                  >
                    {{ logoText }}
                  </span>
                </div>
              </a>
            </div>
            <div class="pl-2 hidden sm:flex items-center justify-center">
              <slot name="leftNav">
                <div class="flex flex-row items-center">
                  <r-dropdown
                    v-for="group in navbarData"
                    :key="group.id"
                    class="px-2"
                  >
                    <template #openButton>
                      <r-link>
                        {{ group.label }}
                        <r-icon
                          name="fas fa-angle-down"
                          class-name="fa-xs"
                        ></r-icon>
                      </r-link>
                    </template>
                    <template #dropdown-item>
                      <li
                        v-for="mod in group.modules"
                        :key="mod.id"
                        class="flex flex-col"
                      >
                        <r-link
                          v-for="func in mod.functions"
                          :link="func.url"
                          >{{ func.label }}</r-link
                        >
                      </li>
                    </template>
                  </r-dropdown>
                </div>
              </slot>
            </div>
          </div>
          <div
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-2
              sm:static
              sm:inset-auto
              sm:ml-6
              sm:pr-0
            "
          >
            <slot name="rightNav">
              <!-- <div
                class="text-secondary-dark hover:text-primary dark:text-white"
              >
                <r-icon name="fas fa-bell"></r-icon>
                <r-badge filled up>322</r-badge>
              </div> -->
            </slot>

            <!-- Profile dropdown -->
            <r-dropdown v-if="userName">
              <template #openButton>
                <button
                  class="
                    hidden
                    sm:flex
                    text-secondary-dark
                    hover:text-primary
                    dark:bg-gray-800
                    text-sm
                    dark:text-white
                    dark:hover:text-primary-light
                    focus:outline-none
                  "
                  id="user-menu"
                  aria-haspopup="true"
                >
                  <div class="flex flex-row items-center uppercase">
                    <div>
                      {{ userName }}
                      <r-icon
                        name="fas fa-angle-down"
                        class-name="fa-xs"
                      ></r-icon>
                    </div>
                    <r-avatar size="small" class="pl-1"></r-avatar>
                  </div>
                </button>
              </template>
              <template #dropdown-item>
                <li class="block">
                  <r-link @click="toggleTheme" class="w-full">
                    <r-icon v-if="darkMode" name="far fa-lightbulb"></r-icon>
                    <r-icon v-else name="fas fa-moon"></r-icon>
                    {{ darkMode ? "Tryb jasny" : "Tryb ciemny" }}
                  </r-link>
                </li>
                <li>
                  <r-link @click="logout()">Wyloguj</r-link>
                </li>
              </template>
            </r-dropdown>
          </div>
        </div>
      </div>

      <!-- Dropdown menu -->
      <div
        class="h-auto pb-2 ml-9 mr-9"
        v-show="isDropDownMenuOpen && !isMobileMenuOpen"
      >
        <r-navbar-dropdown :pickedGroup="pickedGroup"></r-navbar-dropdown>
      </div>

      <!-- Mobile dropdown menu -->
      <div
        class="nav-mobile flex sm:hidden flex-col px-4"
        :hidden="!isMobileMenuOpen"
      >
        <r-dropdown
          v-for="group in navbarData"
          :key="group.id"
          class="px-2"
          :hidden="!isMobileMenuOpen"
          mobile
        >
          <template #openButton>
            <r-link>
              {{ group.label }}
              <r-icon name="fas fa-angle-down" class-name="fa-xs"></r-icon>
            </r-link>
          </template>
          <template #dropdown-item>
            <li
              v-for="mod in group.modules"
              :key="mod.id"
              class="flex flex-col"
            >
              <r-link v-for="func in mod.functions" :link="func.url">{{
                func.label
              }}</r-link>
            </li>
          </template>
        </r-dropdown>
        <div
          :hidden="!isMobileMenuOpen"
          class="border-t border-secondary-light"
        >
          <r-link @click="toggleTheme" class="w-full">
            <r-icon v-if="darkMode" name="far fa-lightbulb"></r-icon>
            <r-icon v-else name="fas fa-moon"></r-icon>
            {{ darkMode ? "Tryb jasny" : "Tryb ciemny" }}
          </r-link>
          <div
            class="flex flex-row justify-between"
            :hidden="!isMobileMenuOpen"
          >
            <div
              class="
                flex
                text-sm text-center
                items-center
                uppercase
                text-secondary-dark
                dark:text-white
                hover:text-primary
                dark:hover:text-primary-light
              "
            >
              <r-avatar size="small" class="pr-1"></r-avatar>
              {{ userName }}
            </div>
            <r-button flat type="danger" @click="logout()"> WYLOGUJ </r-button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { ThemeToggle } from "../../utils";
import { RAvatar } from "../RAvatar";
import { RBadge } from "../RBadge";
import { RButton } from "../RButton";
import { RDropdown } from "../RDropdown";
import { RIcon } from "../RIcon";
import { RLink } from "../RLink";

import { navbarUtil } from "./rnavbar";
import { Group, RNavbarProps, RNavbarInstance } from "./types";

import "../../theme/icons.css";

export default defineComponent({
  name: "RNavbar",
  components: {
    RAvatar,
    RBadge,
    RButton,
    RDropdown,
    RIcon,
    RLink,
  },
  props: {
    /** Link do zdjęcia logo */
    imgLogo: { type: String },
    /** Link, gdzie przekierowywuje po kliknięciu na logo */
    logoHref: { type: String },
    /** Text przy logo */
    logoText: { type: String },
    /** Funkcja wylogowywująca */
    logout: {
      type: Function,
      required: true,
      default: () => {
        console.log("Brak zaimplementowanej funkcjo wylogowywującej");
      },
    },
    /** Dane menu w formacie JSON (grupy, moduły, linki) */
    navbarData: { type: Array as PropType<Group[]> },
    /** Nazwa użytkownika do wyświetlenia */
    userName: { type: String, default: undefined },
    /** Link do zdjęcia użytkownika */
    userPicture: { type: String },
  },
  setup(props: RNavbarProps): RNavbarInstance {
    const darkMode = ref(ThemeToggle.isDarkMode());
    const isDropDownMenuOpen = ref(false);
    const isMobileMenuOpen = ref(false);
    const navbarData = ref(props.navbarData);
    const pickedGroup = ref();
    const pickedGroupId = ref();
    const navUtil = navbarUtil(navbarData.value ?? []);

    document.addEventListener("click", keyDownListiner);

    function keyDownListiner(event: Event) {
      const target = event.target as HTMLAnchorElement;
      const isNavLink = target.classList.contains("nav-link");
      const isNavMobileLink = target.classList.contains("nav-mobile");

      const id = Number(target.dataset["id"]);
      if ((isNavLink || isNavMobileLink) && id) {
        navUtil.pickGroup(id);
        pickedGroup.value = navUtil.pickedGroup.value;
        pickedGroupId.value = navUtil.pickedGroupId.value;
      }

      if (isNavLink && !isMobileMenuOpen.value) {
        isDropDownMenuOpen.value = true;
      } else if (isNavMobileLink && isMobileMenuOpen.value) {
        isDropDownMenuOpen.value = false;
      } else {
        isDropDownMenuOpen.value = false;
      }
    }

    function toggleTheme() {
      ThemeToggle.toggleThemeMode();
      darkMode.value = ThemeToggle.isDarkMode();
    }

    function onClickMobileGroup(id: number) {
      navUtil.pickGroup(id);
    }

    return {
      isDropDownMenuOpen,
      isMobileMenuOpen,
      darkMode,
      pickedGroup,
      pickedGroupId,
      onClickMobileGroup,
      toggleTheme,
    };
  },
});
</script>

<style scoped>
#navbar {
  @apply bg-gray-300;
}
</style>
