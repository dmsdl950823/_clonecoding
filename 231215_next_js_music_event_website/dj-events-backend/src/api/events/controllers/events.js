'use strict';
// const { sanitizeEntity } = require('strapi-utils')

/**
 * events controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::events.events');
