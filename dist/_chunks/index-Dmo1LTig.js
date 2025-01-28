"use strict";
const jsxRuntime = require("react/jsx-runtime");
const styled = require("styled-components");
const react = require("react");
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const Bold = () => {
  const { colors } = styled.useTheme();
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 48 48", fill: colors.neutral900, children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12.15 37.85V7.3H26.7q3.65 0 6.325 2.4 2.675 2.4 2.675 6 0 1.95-1 3.65t-2.75 2.5V22q2.2.8 3.45 2.775 1.25 1.975 1.25 4.375 0 3.75-2.875 6.225Q30.9 37.85 27.05 37.85Zm6.15-18.1h7.35q1.55 0 2.65-1.075 1.1-1.075 1.1-2.625t-1.1-2.625q-1.1-1.075-2.65-1.075H18.3Zm0 13h7.75q1.7 0 2.925-1.15 1.225-1.15 1.225-2.85 0-1.7-1.225-2.875T26.05 24.7H18.3Z" }) });
};
const PLUGIN_ID = "bold-title-editor";
const Initializer = ({ setPlugin }) => {
  const ref = react.useRef(setPlugin);
  react.useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const index = {
  register(app) {
    app.customFields.register({
      name: "bold-title",
      type: "string",
      pluginId: "bold-title-editor",
      icon: Bold,
      intlLabel: {
        id: "bold-title-editor.label",
        defaultMessage: "Bold title editor"
      },
      intlDescription: {
        id: "bold-title-editor.description",
        defaultMessage: "A bold title/text editor to accent certain parts"
      },
      components: {
        Input: async () => Promise.resolve().then(() => require(
          /* webpackChunkName: "bold-title-input-component" */
          "./Input-BHvOXLsk.js"
        ))
      },
      options: {
        base: [
          {
            intlLabel: {
              id: "bold-title-editor.options.base.output",
              defaultMessage: "Output"
            },
            description: {
              id: "bold-title-editor.options.base.output.description",
              defaultMessage: "Choose output of plugin"
            },
            name: "options.output",
            type: "select",
            defaultValue: "HTML",
            options: [
              {
                key: "html",
                value: "html",
                metadatas: {
                  intlLabel: {
                    id: "bold-title-editor.options.base.output.html",
                    defaultMessage: "HTML"
                  }
                }
              },
              {
                key: "markdown",
                value: "markdown",
                metadatas: {
                  intlLabel: {
                    id: "bold-title-editor.options.base.output.markdown",
                    defaultMessage: "Markdown"
                  }
                }
              }
            ]
          }
        ],
        advanced: [
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings"
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "bold-title-editor.options.advanced.requiredField",
                  defaultMessage: "Required field"
                },
                description: {
                  id: "bold-title-editor.options.advanced.requiredField.description",
                  defaultMessage: "You won't be able to create an entry if this field is empty"
                }
              }
            ]
          }
        ]
      }
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => Promise.resolve().then(() => require("./en-D6iNHQqZ.js")), "./translations/nl.json": () => Promise.resolve().then(() => require("./nl-Cm7Fo1KX.js")) }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
exports.Bold = Bold;
exports.index = index;
