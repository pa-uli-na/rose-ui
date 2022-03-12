<template>
  <r-navbar
    logo-text="LOGO"
    :logout="
      () => {
        console.log('logout');
      }
    "
  >
    <r-link>
      <r-icon type="regular" name="fab fa-facebook-square"></r-icon>
      <span>Link 1</span>
    </r-link>
    <r-link>
      <r-icon type="regular" name="fab fa-twitter"></r-icon>
      <span>Link 2</span>
    </r-link>
    <r-link>
      <r-icon type="regular" name="fab fa-twitter"></r-icon>
      <span>Link 3</span>
    </r-link>
    <r-link>
      <r-icon type="solid" name="fas fa-user"></r-icon>
      <span class="font-bold"
        >{{ user.name }}
        <span class="inline sm:hidden font-extralight text-xs">{{
          user.role
        }}</span></span
      >
      <p
        class="font-extralight text-xs hidden sm:block ml-5"
        style="position: absolute; margin-top: -2px"
      >
        {{ user.role }}
      </p>
    </r-link>
    <r-link>
      <r-icon type="solid" name="fas fa-power-off"></r-icon>
      <span>Wyloguj</span>
    </r-link>
  </r-navbar>

  <div class="flex flex-wrap pt-16"></div>

  <r-footer app-version="Application name 1.0.0"></r-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RCard from "../../components/RCard/RCard.vue";
import RFooter from "../../components/RFooter/RFooter.vue";
import RIcon from "../../components/RIcon/RIcon.vue";
import RLink from "../../components/RLink/RLink.vue";
import RNavbar from "../../components/RNavbar/RNavbar.vue";
import RIndicator from "../../components/RIndicator/RIndicator.vue";

export default defineComponent({
  name: "RDashboardPage",
  components: {
    RCard,
    RFooter,
    RIcon,
    RLink,
    RNavbar,
    RIndicator,
  },
  setup() {
    const user = { name: "Jan Kowalski", role: "Employee" };
    const deliveryIndicator = [
      { text: "Open deliveries", value: 1 },
      { text: "In progress", value: 0 },
      {
        text: "Next delivery",
        value: "01.02.2022",
        icon: "fas fa-exclamation",
      },
    ];
    const accountingIndicator = [
      { text: "Settlement date", value: "02.02.2022" },
    ];
    return { deliveryIndicator, accountingIndicator, user };
  },
});
</script>
