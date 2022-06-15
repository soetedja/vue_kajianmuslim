<template>
  <form @submit.prevent="saveLocation" @keydown.enter.prevent="{}" autocomplete="off">
    
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("GoogleRecommendation") }}</h4>
        <div class="form-group">
          <gmap-place-input :select-first-on-enter="true" @place_changed="updatePlace($event)" class="google-autocomplete"></gmap-place-input>
          <span class="small text-danger" v-show="errors.has('province_id')">{{ errors.first('province_id') }}</span>
        </div>
      </div>
      <hr />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("GeneralInformation") }}</h4>
        <input-text v-model="vmodel.id" fieldName="id" fieldText="Id" required disabled hidden/>
        <input-text v-model="vmodel.name" fieldName="name" fieldText="Name" required />
        <input-text-area v-model="vmodel.description" fieldName="description" fieldText="Description" />
        <input-text-area v-model="vmodel.address_line_1" fieldName="address_line_1" fieldText="AddressLine1" />
        <input-text-area v-model="vmodel.address_line_2" fieldName="address_line_2" fieldText="AddressLine2" />
        <input-text v-model="vmodel.postal_code" fieldName="postal_code" fieldText="PostalCode" />
        <!-- <select-option v-model="vmodel.province_id" fieldName="province_id" fieldText="Province" :options="provinces" required /> -->
        <div class="form-group form-control-select">
          <label for="entity">{{ $resources("Province") }}</label>
          <input v-validate="'required'" v-model="vmodel.province_id" name="province_id" type="hidden">
          <model-list-select 
            :list="$allProvinces()"
            option-value="id"
            :custom-text="optionDisplayText"
            v-model="vmodel.province_id"
            :placeholder="$resources('SelectOption')">
          </model-list-select>
          <span class="small text-danger" v-show="errors.has('province_id')">{{ errors.first('province_id') }}</span>
        </div>
        <div class="form-group form-control-select">
          <label for="entity">{{ $resources("Regency") }}</label>
          <model-list-select 
            :list="regencies"
            option-value="id"
            :custom-text="optionDisplayText"
            v-model="vmodel.regency_id"
            :placeholder="$resources('SelectOption')">
          </model-list-select>
          <!-- <span class="small text-danger" v-show="errors.has('vmodel.regency_id')">{{ errors.first('vmodel.regency_id') }}</span> -->
        </div>
        <div class="form-group form-control-select">
          <label for="entity">{{ $resources("District") }}</label>
          <model-list-select 
            :list="districts"
            option-value="id"
            :custom-text="optionDisplayText"
            v-model="vmodel.district_id"
            :placeholder="$resources('SelectOption')">
          </model-list-select>
          <!-- <span class="small text-danger" v-show="errors.has('vmodel.regency_id')">{{ errors.first('vmodel.regency_id') }}</span> -->
        </div>
        <div class="form-group form-control-select">
          <label for="entity">{{ $resources("Village") }}</label>
          <model-list-select 
            :list="villages"
            option-value="id"
            :custom-text="optionDisplayText"
            v-model="vmodel.village_id"
            :placeholder="$resources('SelectOption')">
          </model-list-select>
          <!-- <span class="small text-danger" v-show="errors.has('vmodel.regency_id')">{{ errors.first('vmodel.regency_id') }}</span> -->
        </div>
        <!-- <select-option v-model="vmodel.regency_id" fieldName="regency_id" fieldText="Regency" :options="regencies" required /> -->
        <!-- <select-option v-model="vmodel.district_id" fieldName="district_id" fieldText="Regency" :options="districs" required /> -->
        <!-- <select-option v-model="vmodel.village_id" fieldName="village_id" fieldText="Regency" :options="villages" required /> -->
        <input-text v-model="vmodel.latitude" fieldName="latitude" fieldText="Latitude" />
        <input-text v-model="vmodel.longitude" fieldName="longitude" fieldText="Longitude" />
        <input-text v-model="vmodel.contact_name" fieldName="contact_name" fieldText="ContactName" />
        <input-text v-model="vmodel.contact_number" fieldName="contact_number" fieldText="ContactNumber" />
        <select-option v-model="vmodel.status_id" fieldName="status_id" fieldText="Status" :options="statusesByEntity" required />
        <!-- <select-option v-model="vmodel.location_type_id" fieldName="location_type_id" fieldText="LocationType" :options="activeLocationTypes" required /> -->
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
      <span><b>{{ $resources("Msg_DeleteConfirmation", $resources("Location"), model.name) }}</b></span>
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
// import { ENTITY } from '@/config'
import { ModelSelect, ModelListSelect } from 'vue-search-select'

export default {
  props: ['model', 'isEditing'],
  data () {
    return {
      vmodel: {},
      statusesByEntity: this.$store.getters.getStatusByEntity('LOCATION'),
      deleteModal: false,
      regencies: [],
      districts: [],
      villages: []
      // allProvinces: []
    }
  },
  created () {
    this.vmodel = Object.assign({}, this.model)
    if ($.isEmptyObject(this.statusesByEntity)) {
      this.$store.dispatch('getStatusByEntity', {
        entity: 'LOCATION',
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
    saveLocation () {
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
      this.$router.push({name: 'LocationList'})
    },

    /**
     * Column delete action.
     */
    deleteAction () {
      this.$data.deleteModal = false
      this.$emit('remove', this.model.id)
    },
    optionDisplayText (item) {
      return `${item.name}`
    },
    updatePlace (place) {
      console.log(place)
      if (place && place.geometry && place.geometry.location) {
        // var marker = this.addMarker()
        // marker.position.lat = place.geometry.location.lat()
        // marker.position.lng = place.geometry.location.lng()
      }
    }
  },
  watch: {
    'model': function () {
      this.vmodel = Object.assign({}, this.model)
    },
    'vmodel.province_id': function (value) {
      $(':focus').trigger('blur')
      this.$store.dispatch('getRegenciesByProvinceId', {
        province_id: value,
        option: true
      }).then(response => {
        this.regencies = response
        this.districts = []
        this.villages = []
      })
    },
    'vmodel.regency_id': function (value) {
      $(':focus').trigger('blur')
      this.$store.dispatch('getDistrictsByRegencyId', {
        regency_id: value,
        option: true
      }).then(response => {
        this.districts = response
        this.villages = []
      })
    },
    'vmodel.district_id': function (value) {
      $(':focus').trigger('blur')
      this.$store.dispatch('getVillagesByDistrictId', {
        district_id: value,
        option: true
      }).then(response => {
        this.villages = response
      })
    }
  },
  components: {
    Versioning,
    SelectOption,
    InputTextArea,
    InputText,
    ModelSelect,
    ModelListSelect
  }
}
</script>
