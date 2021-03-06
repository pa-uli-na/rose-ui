import RNavbar from "../../components/RNavbar/RNavbar.vue";
import "../../theme/index.css";
import { data } from "./rnavbar.mock.json";

export default {
  title: "components/RNavbar",
  component: RNavbar,
};

// data
import imgLogo from "../../assets/logo.png";
import imgLogo2 from "../../assets/logo2.png";

function logout() {
  console.log("logout");
  alert("TODO: logout");
}

// stories
const TemplateDefault = (args) => ({
  components: { RNavbar },
  setup() {
    return { args };
  },
  template: `<r-navbar v-bind="args"></r-navbar>`,
});

export const Default = TemplateDefault.bind({});
Default.args = {
  logoHref: "/",
  logoText: "LOGO",
  navbardData: data,
  userName: "Jan Kowalski",
  logout,
};

export const WithLogo = Default.bind({});
WithLogo.args = {
  imgLogo: imgLogo,
  logoText: "LOGO",
  navbardData: data,
  userName: "Jan Kowalski",
};

export const WithLinks = Default.bind({});
WithLinks.args = {
  logoHref: "/",
  logoText: "LOGO",
  navbarData: data,
  userName: "Jan Kowalski",
  logout,
};
