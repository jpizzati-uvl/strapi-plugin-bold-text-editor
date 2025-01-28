import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'bold-title',
    plugin: 'bold-text-editor',
    type: 'string',
  });
};

export default register;
