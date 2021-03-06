import { App } from "vue";
import { version } from "../../package.json";

type ComponentType = any;

export interface RoseUiInstance {
  version: string;
  install: (app: App) => void;
}

interface RoseUiCreateOptions {
  components?: ComponentType[];
}

function create({ components = [] }: RoseUiCreateOptions = {}): RoseUiInstance {
  const installTargets: App[] = [];

  function registerComponent(
    app: App,
    name: string,
    component: ComponentType
  ): void {
    const registered = app.component(name);
    if (!registered) {
      app.component(name, component);
    }
  }

  function install(app: App): void {
    if (installTargets.includes(app)) return;

    installTargets.push(app);
    components.forEach((component) => {
      const { name, alias } = component;
      registerComponent(app, name, component);
      if (alias) {
        alias.forEach((aliasName: string) => {
          registerComponent(app, aliasName, component);
        });
      }
    });
  }

  return {
    version,
    // componentPrefix,
    install,
  };
}

export default create;
