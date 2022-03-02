<template>
  <div class="bg-white dark:bg-gray-800">
    <r-navbar
      logo-text="LOGO"
      :logout="
        () => {
          console.log('logout');
        }
      "
    >
    </r-navbar>

    <div class="r-form flex justify-center p-2">
      <div class="flex flex-col pt-2">
        <r-input
          v-model="loginRef"
          :label="'Login'"
          :placeholder="'Nazwa użytkownika'"
          required
        ></r-input>
        <r-input
          v-model="passwordRef"
          :label="'Password'"
          :placeholder="'Hasło'"
          :type="'password'"
          required
        ></r-input>
        <r-button :disabled="disableBtnRef">Zaloguj</r-button>
        <r-checkbox
          id="logindId"
          v-model="isDomainLogin"
          :label="'Logowanie domenowe'"
        ></r-checkbox>
      </div>
    </div>
    <div class="w-full flex flex-col justify-center">
      <r-radio-tile
        v-model="roleSelectedOption"
        size="small"
        :name="'rolesRadio'"
        :items="roleOptions"
      ></r-radio-tile>
    </div>

    <r-footer app-version="Application name 1.0.0"></r-footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { RButton } from "../../components/RButton";
import { RCheckbox } from "../../components/RCheckbox";
import { RFooter } from "../../components/RFooter";
import { RInput } from "../../components/RInput";
import { RNavbar } from "../../components/RNavbar";
import { RRadio } from "../../components/RRadio";
import { RRadioTile } from "../../components/RRadioTile";
import { RSwitch } from "../../components/RSwitch";

export default defineComponent({
  name: "RLoginPage",
  components: {
    RButton,
    RCheckbox,
    RFooter,
    RInput,
    RNavbar,
    RRadio,
    RRadioTile,
    RSwitch,
  },
  setup() {
    const loginRef = ref("");
    const passwordRef = ref("");
    const isDomainLogin = ref(false);

    const roleSelectedOption = ref("");
    const roleOptions = ref([
      {
        label: "Pracownik sklepu",
        value: "storeEmployee",
        icon: "fas fa-user",
      },
      {
        label: "Pracownik ochrony",
        value: "securityEmployee",
        icon: "fas fa-user-shield",
      },
      {
        label: "Pracownik uczący się",
        value: "newbeeEmployee",
        icon: "fas fa-user-graduate",
      },
      {
        label: "Pracownik zewnętrzny",
        value: "externalEmployee",
        icon: "fas fa-user-secret",
      },
      {
        label: "Pracownik centrala",
        value: "centralEmployee",
        icon: "fas fa-user-tie",
      },
    ]);
    const disableBtnRef = computed(
      () => !loginRef.value || !passwordRef.value || !roleSelectedOption.value
    );

    return {
      loginRef,
      isDomainLogin,
      passwordRef,
      roleOptions,
      roleSelectedOption,
      disableBtnRef,
    };
  },
});
</script>
