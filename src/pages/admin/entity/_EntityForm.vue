<template>
  <form @submit.prevent="saveEntity">
    <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("GeneralInformation") }}</h4>
        <input-text v-model="vmodel.id" fieldName="id" fieldText="Id" required disabled />
        <input-text v-model="vmodel.entity" fieldName="entity" fieldText="Entity" required />
      </div>
    </div>
    <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("Relationship") }}</h4>
        <div class="form-group form-control-select">
          <label for="entity">{{ $resources("EntityStatus") }}</label>
          <treeselect
            v-model="vmodel.statuses"
            :multiple="true"
            :options="allStatuses"
            :load-root-options="loadRootOptions" 
            />
        </div>
      </div>
    </div>
    <!-- <versioning :model="model"/> -->

    <div class="col-md-12">
      <hr />
      <div class="form-group new-button pull-right">
        <button class="button btn btn-primary">
          <i class="fas fa-save fa-fw"></i>
          <span> {{ $resources("Save") }}</span>
        </button>
        <a @click="back()" class="button btn btn-primary">
          <i class="fas fa-chevron-circle-left fa-fw"></i>
          <span>{{ $resources("Back") }}</span>
        </a>
        <a v-if="isEditing" @click="deleteConfirm()" class="button btn btn-danger">
          <i class="fas fa-remove fa-fw"></i>
          <span> {{ $resources("Remove") }}</span>
        </a>
      </div>
    </div>
     
    <uiv-modal v-model="deleteModal" :title="$resources('DeleteConfirmation')">
      <span>{{ $resources("Msg_DeleteConfirmation", $resources("Entity"), model.entity) }}</span>
      <div slot="footer">
        <uiv-btn @click="deleteModal=false">{{ $resources("CommonResources.Cancel") }}</uiv-btn>
        <uiv-btn type="danger" @click="deleteAction()">{{ $resources("CommonResources.Remove") }}</uiv-btn>
      </div>
    </uiv-modal>
  </form>
</template>

<script>
import { VALIDATION_ERROR } from '@/store/base/mutation-types'
import Treeselect from '@riophae/vue-treeselect'
import { ENTITY } from '@/config'
import InputText from '@/components/common/InputText'

export default {
  props: ['model', 'isEditing'],
  data () {
    return {
      vmodel: {},
      deleteModal: false
    }
  },
  created () {
    this.vmodel = Object.assign({}, this.model)
  },
  computed: {
    allStatuses () {
      var statuses = this.$store.getters.get(ENTITY.STATUS.ALL)
      if (!$.isEmptyObject(statuses)) {
        return statuses
      }

      this.$store.dispatch('getAll', {
        entity: ENTITY.STATUS
      })
      .then(result => {
        return Object.assign([], result)
      })
    }
  },
  mounted: function () {
  },
  methods: {
    saveEntity () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('save', this.vmodel)
          return
        }
        this.$store.commit(VALIDATION_ERROR, {})
      })
    },
    loadRootOptions (callback) {
      callback(null, this.$store.getters.get(ENTITY.STATUS.ALL))
    },
    deleteConfirm () {
      this.$data.deleteModal = true
    },
    back () {
      this.$router.push({name: 'EntityList'})
    },
    deleteAction () {
      this.$data.deleteModal = false
      this.$emit('remove', this.model.id)
    }
  },
  watch: {
    'model': function () {
      this.vmodel = Object.assign({}, this.model)
    },
    'allStatuses': function () {
      this.vmodel.statuses = this.model.statuses
    }
  },
  components: {
    inputText: InputText,
    treeselect: Treeselect
  }
}
</script>
