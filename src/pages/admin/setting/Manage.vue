<template>
  <div class="">
      <uiv-tabs>
        <uiv-tab title="General">
          <p>General Setting</p>
        </uiv-tab>
        <uiv-tab title="Email">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="control-label col-md-2" for="smtpStatus">SMTP Status:</label>
              <div class="col-md-2">
                <toggle-button disabled :sync="true" v-model="appSettings.isSMTPAuthorized"/>
                <p v-if="appSettings.isSMTPAuthorized">Connected</p>
                <p v-else>Disconnected</p>
              </div>
              <div class="col-md-2 text-right">
                <button v-if="!appSettings.isSMTPAuthorized" class="btn btn-primary" @click.prevent="authorizeOauth2()">Authorize</button>
                <button v-else class="btn btn-danger" @click.prevent="revokeConfirm()">Revoke</button>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2" for="authorizedRedirectUri">Authorized Redirect URI:</label>
              <div class="col-sm-4"> 
                <input type="text" v-model="appSettings.authorizedRedirectUri" class="form-control" disabled id="authorizedRedirectUri" placeholder="Authorized Redirect URI">
              </div>
            </div>
          </form>
          <div class="row" v-if="appSettings.isSMTPAuthorized">
            <div class="col-md-6">
              <hr />
              <h4 class="category">Test Email</h4>
              <br/>
              <form>
                <div class="form-group form-control-default required">
                  <label class="disabled" for="From">From</label>
                  <input 
                    type="text" 
                    placeholder="" 
                    v-model="email.from"
                    v-validate="'required'"
                    name="From"
                    disabled="disabled"
                    :class="{'form-control': true, 'error': errors.has('From') }" />
                    <span class="small text-danger" v-show="errors.has('From')">From is required</span>
                </div>
                <div class="form-group form-control-default required">
                  <label for="To">To</label>
                  <input 
                    type="text" 
                    placeholder="Email address of the recipient" 
                    v-model="email.to"
                    v-validate="'required'"
                    name="To"
                    :class="{'form-control': true, 'error': errors.has('To') }" />
                    <span class="small text-danger" v-show="errors.has('To')">To is required</span>
                </div>
                <div class="form-group form-control-default required">
                  <label for="Name">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Subject of the email" 
                    v-model="email.subject"
                    v-validate="'required'"
                    name="subject"
                    :class="{'form-control': true, 'error': errors.has('subject') }" />
                    <span class="small text-danger" v-show="errors.has('subject')">Subject is required</span>
                </div> 
                <div class="form-group form-control-default">
                  <label for="body">Message</label>
                  <textarea 
                    id="body" 
                    class="form-control" 
                    rows="5"
                    v-model="email.body"
                    >
                  </textarea>
                </div>
                <div class="form-group new-button pull-right">
                  <a @click="sendTestMail()" class="button btn btn-primary">
                    <i class="fas fa-send fa-fw"></i>
                    <span>Send</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </uiv-tab>
        <uiv-tab title="Table view"><div class="white-box">
          <div class="content-title">
            <div class="row">
              <div class="col-xs-5">
                <h2>Setting <b>List</b></h2>
                <p>List setting for each setting</p>
              </div>
              <div class="add-button col-xs-7 text-right">
                <button @click="reloadTable()" class="btn btn-primary"><i class="fas fa-sync"></i> <span>Reload</span></button>
                <button @click="gotoAdd()" class="btn btn-primary"><i class="fas fa-edit"></i> <span>Add</span></button>
              </div>
            </div>
          </div>
            <div class="table-filter">
              <div class="row">
                <datatable-perpage v-model="perPage"></datatable-perpage>
                <datatable-search v-model="search"></datatable-search>
              </div>
            </div>
            <datatable
              ref="table"
              :columns="columns"
              :actions="actions"
              :search="search"
              :per-page="perPage"
              :server-side="true"
              :responsive="true"
              :ajax="ajax"
            ></datatable>
            </div>
        </uiv-tab>
      </uiv-tabs>
    
    <uiv-modal v-model="deleteModal" title="Delete Confirmation">
      <span>Are you sure want to delete setting <b>'{{ name }}'</b> in <b>'{{ setting }}'</b>?</span>
      <div slot="footer">
        <uiv-btn @click="deleteModal=false">Cancel</uiv-btn>
        <uiv-btn type="danger" @click="deleteAction()">Remove</uiv-btn>
      </div>
    </uiv-modal>
    
    <uiv-modal v-model="revokeModal" title="Revoke Confirmation">
      <span>Are you sure want to revoke <b>oauth2</b>?</span>
      <div slot="footer">
        <uiv-btn @click="revokeModal=false">Cancel</uiv-btn>
        <uiv-btn type="danger" @click="revokeAction()">Revoke</uiv-btn>
      </div>
    </uiv-modal>
  </div>
</template>

<script>
import { ENTITY } from '@/config'

export default {
  data () {
    return {
      email: {
        to: 'soetedja@live.com',
        subject: 'This is a test mail from Kajianmuslim.id',
        body: 'Message body of test mail'
      },
      deleteModal: false,
      revokeModal: false,
      name: '',
      setting: '',
      search: '',
      perPage: 10,
      columns: [
        { name: 'id', data: 'id', title: '#', width: '10%' },
        { name: 'setting', data: 'setting', title: 'Setting', width: '20%' },
        {
          name: '__actions',
          title: 'Actions',
          width: '10%',
          titleClass: 'text-center'
        }
      ],
      actions: [
        {
          title: 'Edit',
          icon: 'glyphicon glyphicon-pencil',
          class: 'btn btn-default btn-xs',
          click: [this, 'editAction'],
          button: true
        },
        {
          title: 'Delete',
          icon: 'glyphicon glyphicon-trash',
          class: 'btn btn-default btn-xs',
          click: [this, 'deleteConfirm'],
          button: true
        }
      ],

      ajax: function (data, callback, settings) {
        // // prevent misterious double ajax calls
        // // if (this.$store.state.showLoader) return
        // var params = {
        //   filter: data.search.value,
        //   sorting: {
        //     [data.columns[data.order[0].column].data]: data.order[0].dir
        //   },
        //   count: data.length,
        //   start: data.start
        // }

        // this.$store
        //   .dispatch('search', {
        //     entity: ENTITY.ENTITY,
        //     params: params
        //   })
        //   .then(result => {
        //     var p = {
        //       recordsTotal: result.model.total_items,
        //       recordsFiltered: result.model.total_items,
        //       data: result.model.items
        //     }
        //     callback(p)
        //   })
        //   .catch(error => {
        //     console.log('error: ', error)
        //   })
      }
    }
  },
  created () {
    this.$store.dispatch('getAppSettings', {
      entity: ENTITY.SETTING
    })
  },

  computed: {
    appSettings () {
      const appSettings = this.$store.getters.getAppSettings()
      this.$data.email.from = appSettings.senderEmail
      return Object.assign({}, appSettings)
    }
  },

  updated () {
  },

  components: {
  },

  methods: {
    /**
     * Column view action.
     */
    // viewAction (user) {
    //   console.log('viewAction', user)
    // },

    /**
     * Column edit action.
     */
    editAction (user) {
      this.$router.push({ name: 'EditSetting', params: { id: user.id } })
    },

    /**
     * Column confirm delete action.
     */
    deleteConfirm (setting) {
      this.$data.deleteModal = true
      this.$data.setting = setting.setting
      this.$data.name = setting.name
      this.$data.deleteId = setting.id
    },

    revokeConfirm () {
      this.$data.revokeModal = true
    },

    /**
     * Column delete action.
     */
    deleteAction (id) {
      this.$data.deleteModal = false
      this.$store
        .dispatch('remove', {
          entity: ENTITY.SETTING,
          id: this.$data.deleteId
        })
        .then(result => {
          this.$refs.table.draw()
        })
        .catch(error => {
          console.log('error: ', error)
        })
    },

    revokeAction () {
      this.$data.revokeModal = false
      this.$store
        .dispatch('revokeOauth2', {
          entity: ENTITY.SETTING
        })
        .then(result => {
          if (!result) return
          this.$store.dispatch('getAppSettings', {
            entity: ENTITY.SETTING
          })
        })
        .catch(error => {
          console.log('error: ', error)
        })
    },

    gotoAdd () {
      this.$router.push({ name: 'AddSetting' })
    },

    reloadTable () {
      this.$refs.table.draw()
    },

    authorizeOauth2 () {
      this.$store
        .dispatch('authorizeOauth2', {
          entity: ENTITY.SETTING
        })
        .then(result => {
          if (!result.isAuthorized) {
            console.log(result.authUrl)
            window.open(result.authUrl, '_blank')
          }
        })
        .catch(error => {
          console.log('error: ', error)
        })
    },

    sendTestMail () {
      this.$store
        .dispatch('sendTestMail', {
          entity: ENTITY.SETTING,
          data: this.$data.email
        })
        .then(result => {})
        .catch(error => {
          console.log('error: ', error)
        })
    }
  }
}
</script>

<style scoped>
  .nav-tabs > li.active > a, .nav-tabs > li.active > a:hover {
      border-left-color: #ddd !important;
  }
  .form-horizontal .control-label {
      text-align: left !important;
  }
</style>