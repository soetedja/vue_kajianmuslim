<template>
  <form @submit.prevent="saveStatus">
    <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">General information</h4>
        <div class="form-group form-control-default">
          <label class="disabled" for="id">Id</label>
          <input 
            type="text" 
            placeholder="" 
            v-model="model.id"
            v-validate="'required'"
            name="id"
            disabled="disabled"
            :class="{'form-control': true, 'error': errors.has('id') }" />
            <span class="small text-danger" v-show="errors.has('id')">{{ errors.first('id') }}</span>
        </div>
        <div class="form-group form-control-select required">
          <label for="setting">Setting</label>
          <select
            data-none-selected-text=""
            v-validate="'required'"
            name="setting"
            class="selectpicker"
            ref="setting"
            v-model="model.setting"
            :class="{'form-control': true, 'error': errors.has('setting') }" >
            <option v-bind:key="key" v-for="(item, key) in allEntities">{{item.setting}}</option>
          </select>
          <span class="small text-danger" v-show="errors.has('setting')">{{ errors.first('setting') }}</span>
        </div>
        <div class="form-group form-control-default required">
          <label for="Name">{{ $resources("Name") }}</label>
          <input 
            type="text" 
            :placeholder="$resources('Name')" 
            v-model="model.name"
            v-validate="'required'"
            name="name"
            :class="{'form-control': true, 'error': errors.has('name') }" />
            <span class="small text-danger" v-show="errors.has('name')">{{ errors.first('name') }}</span>
        </div> 
        <div class="form-group form-control-default">
          <label for="description">{{ $resources("Description") }}</label>
          <textarea 
            id="description" 
            class="form-control" 
            rows="5"
            v-model="model.description"
            >
          </textarea>
        </div>
      </div>
    </div>

    <versioning :model="model"/>

    <div class="col-md-12">
      <hr />
      <div class="form-group new-button pull-right">
        <button class="button btn btn-primary">
          <i class="fas fa-save fa-fw"></i>
          <span> {{ $resources("Save") }}</span>
        </button>
        <a @click="back()" class="button btn btn-primary">
          <i class="fas fa-chevron-circle-left fa-fw"></i>
          <span>{{ $resources("Cancel") }}</span>
        </a>
        <a v-if="isEditing" @click="deleteConfirm()" class="button btn btn-danger">
          <i class="fas fa-remove fa-fw"></i>
          <span> {{ $resources("Remove") }}</span>
        </a>
      </div>
    </div>

    <uiv-modal v-model="deleteModal" :title="$resources('DeleteConfirmation')">
      <span>{{ $resources("Msg_DeleteConfirmation", $resources("Setting"), model.setting) }}</span>
      <div slot="footer">
        <uiv-btn @click="deleteModal=false">{{ $resources("Cancel") }}</uiv-btn>
        <uiv-btn type="danger" @click="deleteAction()"> {{ $resources("Remove") }}</uiv-btn>
      </div>
    </uiv-modal>
  </form>
</template>

<script>
import Versioning from '@/components/admin/Versioning'
import { ENTITY } from '@/config'
import { VALIDATION_ERROR } from '@/store/base/mutation-types'

export default {
  props: ['model', 'isEditing'],
  data () {
    return {
      deleteModal: false
    }
  },
  created () {
    // this.model.setting = ''
  },
  updated () {
    $(this.$refs.setting).selectpicker('refresh')
  },
  mounted: function () {
  },
  computed: {
    allEntities () {
      const allEntities = this.$store.getters.get(
        ENTITY.ENTITY.ALL
      )
      return Object.assign({}, allEntities)
    }
  },
  methods: {
    saveStatus () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('save', this.model)
          return
        }
        this.$store.commit(VALIDATION_ERROR, {})
      })
    },
    deleteConfirm () {
      this.$data.deleteModal = true
    },
    back () {
      this.$router.push({name: 'StatusList'})
    },

    /**
     * Column delete action.
     */
    deleteAction () {
      this.$data.deleteModal = false
      this.$emit('remove', this.model.id)
    }
  },
  components: {
    versioning: Versioning
  }
}
</script>
