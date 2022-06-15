import Vue from 'vue'

const defaults = {
  dom: `
    <'row'<'col-sm-12'tr>>
    <'row'<'col-sm-5'i><'col-sm-7'p>>
  `,

  language: {
    // url: 'https://cdn.datatables.net/plug-ins/1.10.16/i18n/Indonesian.json',
    url: '../../../static/js/dataTable.id.json',
    search: '_INPUT_',
    searchPlaceholder: 'Cari...',
    lengthMenu: '_MENU_',
    paginate: {
      previous: '&laquo;',
      next: '&raquo;'
    }
  },

  perPage: 10,

  perPageOptions: [10, 25, 50, 75, 100],

  tableClass: 'table table-hover dtr-inline',

  /**
   * Use vue-resource instead of jQuery.
   *
   * @param {Object}   data
   * @param {Function} callback
   * @param {Object}   settings
   */
  ajax (data, callback) {
    const params = { ...this.params, ...data }

    // vue-resource bug
    // https://github.com/vuejs/vue-resource/pull/449
    params._length = params.length
    delete params.length

    Vue.http.get(this.url, { params }).then(({ body }) => {
      callback(body)
    })
  }
}

/**
 * Merge the given options into the default options.
 *
 * @param {Object} options
 */
const merge = function merge (options) {
  Object.assign(defaults, options)
}

export { merge }
export default defaults
