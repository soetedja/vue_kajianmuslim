<template>
  <form @submit.prevent="saveStatus">
    <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("GeneralInformation") }}</h4>
        <input-text v-model="vmodel.id" fieldName="id" fieldText="Id" required disabled />
        <input-text v-model="vmodel.name" fieldName="name" fieldText="Name" required />
        <input-text-area v-model="vmodel.description" fieldName="description" fieldText="Description" />
        <select-option v-model="vmodel.status_id" fieldName="status_id" fieldText="Status" :options="statusesByEntity" required />
      </div>
    </div>
    <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("Relationship") }}</h4>
        <div class="form-group form-control-select">
          <label for="entity">{{ $resources("RolePrivileges") }}</label>
          <treeselect
            v-model="vmodel.privileges"
            :multiple="true"
            :options="activePrivileges"
            :load-root-options="loadRootOptions" 
            />
            <span class="small text-danger" v-show="errors.has('entity')">{{ errors.first('entity') }}</span>
        </div>
      </div>
    </div>
    
    <versioning :model="model"/>

    <div class="col-md-12">
      <hr />
      <div class="form-group new-button pull-right">
        <button class="button btn btn-primary">
          <i class="fa fa-save fa-fw"></i>
          <span> {{ $resources("Save") }}</span>
        </button>
        <a @click="back()" class="button btn btn-primary">
          <i class="fa fa-chevron-circle-left fa-fw"></i>
          <span>{{ $resources("Back") }}</span>
        </a>
        <a v-if="isEditing" @click="deleteConfirm()" class="button btn btn-danger">
          <i class="fa fa-remove fa-fw"></i>
          <span> {{ $resources("Remove") }}</span>
        </a>
      </div>
    </div>

    <uiv-modal v-model="deleteModal" :title="$resources('DeleteConfirmation')">
      <span><b>{{ $resources("Msg_DeleteConfirmation", $resources("Role"), model.name) }}</b></span>
      <div slot="footer">
        <uiv-btn @click="deleteModal=false">{{ $resources("Cancel") }}</uiv-btn>
        <uiv-btn type="danger" @click="deleteAction()">{{ $resources("Remove") }}</uiv-btn>
      </div>
    </uiv-modal>
  </form>
</template>

<script>
import Versioning from '@/components/admin/Versioning'
import SelectOption from '@/components/common/SelectOption'
import { VALIDATION_ERROR } from '@/store/base/mutation-types'
import InputText from '@/components/common/InputText'
import InputTextArea from '@/components/common/InputTextArea'
import { ENTITY } from '@/config'
import Treeselect from '@riophae/vue-treeselect'

export default {
  props: ['model', 'isEditing'],
  data () {
    return {
      deleteModal: false,
      vmodel: {},
      statusesByEntity: this.$store.getters.getStatusByEntity('ROLE')
    }
  },
  created () {
    this.vmodel = Object.assign({}, this.model)
    if ($.isEmptyObject(this.statusesByEntity)) {
      this.$store.dispatch('getStatusByEntity', {
        entity: 'ROLE',
        option: true
      })
      .then(result => {
        this.statusesByEntity = Object.assign({}, result.model)
      })
    }
  },
  updated () {
  },
  mounted: function () {
  },
  computed: {
    activePrivileges () {
      var privileges = this.$store.getters.get(ENTITY.PRIVILEGE.ACTIVE)
      if (!$.isEmptyObject(privileges)) {
        return $.fn.populateTreeSelect(privileges)
      }

      this.$store.dispatch('getActive', {
        entity: ENTITY.PRIVILEGE
      })
      .then(result => {
        return $.fn.populateTreeSelect(Object.assign([], result))
      })
    },
    verified () {
      return this.$props.model.verified === '1'
    }
  },
  methods: {
    saveStatus () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.vmodel.privileges = $.fn.populateSelectedOption(this.vmodel.privileges, $.fn.populateTreeSelect(this.$store.getters.get(ENTITY.PRIVILEGE.ACTIVE)))
          this.$emit('save', this.vmodel)
          return
        }
        this.$store.commit(VALIDATION_ERROR, {})
      })
    },
    loadRootOptions (callback) {
      callback(null, $.fn.populateTreeSelect(this.$store.getters.get(ENTITY.PRIVILEGE.ACTIVE)))
    },
    deleteConfirm () {
      this.$data.deleteModal = true
    },
    back () {
      this.$router.push({name: 'RoleList'})
    },

    /**
     * Column delete action.
     */
    deleteAction () {
      this.$data.deleteModal = false
      this.$emit('remove', this.model.id)
    }
  },
  watch: {
    'model': function () {
      this.vmodel = Object.assign({}, this.model)
      this.vmodel.privileges = $.fn.loadTreeOption(this.model.privileges, this.activePrivileges)
    },
    'activePrivileges': function () {
      this.vmodel.privileges = $.fn.loadTreeOption(this.model.privileges, this.activePrivileges)
    }
  },
  components: {
    versioning: Versioning,
    selectOption: SelectOption,
    inputTextArea: InputTextArea,
    inputText: InputText,
    treeselect: Treeselect
  }
}
</script>
