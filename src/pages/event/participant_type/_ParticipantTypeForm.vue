<template>
  <form @submit.prevent="saveParticipantType">
    <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("GeneralInformation") }}</h4>
        <input-text v-model="vmodel.id" fieldName="id" fieldText="Id" required disabled />
        <input-text v-model="vmodel.name" fieldName="name" fieldText="Name" required />
        <input-text-area v-model="vmodel.description" fieldName="description" fieldText="Description" />
        <select-option v-model="vmodel.status_id" fieldName="status_id" fieldText="Status" :options="statusesByEntity" required />
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
      <span><b>{{ $resources("Msg_DeleteConfirmation", $resources("ParticipantType"), model.name) }}</b></span>
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
import InputText from '@/components/common/InputText'
import InputTextArea from '@/components/common/InputTextArea'
import { VALIDATION_ERROR } from '@/store/base/mutation-types'

export default {
  props: ['model', 'isEditing'],
  data () {
    return {
      vmodel: {},
      statusesByEntity: this.$store.getters.getStatusByEntity('PARTICIPANT_TYPE'),
      deleteModal: false
    }
  },
  created () {
    this.vmodel = Object.assign({}, this.model)
    if ($.isEmptyObject(this.statusesByEntity)) {
      this.$store.dispatch('getStatusByEntity', {
        entity: 'PARTICIPANT_TYPE',
        option: true
      })
      .then(result => {
        this.statusesByEntity = Object.assign({}, result.model)
      })
    }
  },
  updated () {
    $(this.$refs.status_id).selectpicker('refresh')
  },
  mounted: function () {
  },
  computed: {
  },
  methods: {
    saveParticipantType () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('save', this.vmodel)
          return
        }
        this.$store.commit(VALIDATION_ERROR, {})
      })
    },
    deleteConfirm () {
      this.$data.deleteModal = true
    },
    back () {
      this.$router.push({name: 'ParticipantTypeList'})
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
    }
  },
  components: {
    versioning: Versioning,
    selectOption: SelectOption,
    inputTextArea: InputTextArea,
    inputText: InputText
  }
}
</script>
