"use strict";
const register = ({ strapi }) => {
  strapi.customFields.register({
    name: "bold-title",
    plugin: "bold-title-editor",
    type: "string"
  });
};
const index = {
  register
};
module.exports = index;
