<template>
  <form @submit.prevent="saveEvent">
    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("GeneralInformation") }}</h4>
        <input-text v-model="vmodel.id" fieldName="id" fieldText="Id" required disabled />
        <input-text v-model="vmodel.title" fieldName="title" fieldText="Title" required />
        <input-text-area v-model="vmodel.description" fieldName="description" fieldText="Description" />
        <div class="form-group form-control-select time-picker">
          <div class="col-xs-6">
            <label for="fieldName" class="">{{ $resources("DateTime") }}</label>
            <uiv-date-picker v-model="date" :today-btn="false" :clear-btn="false"/>
            <span class="small text-danger" v-show="errors.has('startTime')">{{ errors.first('startTime') }}</span>
          </div>
          <div class="col-xs-6 text-center">
            <label for="StartTime">{{ $resources("StartTime") }}</label>
            <uiv-time-picker v-model="startTime" :show-meridian="false" />
            <span class="small text-danger" v-show="errors.has('startTime')">{{ errors.first('startTime') }}</span>
          </div> 
          <div class="col-xs-6 text-center">
            <label for="EndTime">{{ $resources("EndTime") }}</label>
            <uiv-time-picker v-model="finishTime" :show-meridian="false" />
            <span class="small text-danger" v-show="errors.has('finishTime')">{{ errors.first('finishTime') }}</span>
          </div> 
        </div> 
        <div class="row" style="margin-left:0px">
        </div>
        <br />
        <!-- <select-option v-model="vmodel.participant_type_id" fieldName="participant_type_id" fieldText="ParticipantType" :options="participantTypes" required /> -->
        <input-text-area v-model="vmodel.notes" fieldName="notes" fieldText="Notes" />
        <!-- <input-text v-model="vmodel.location_id" fieldName="location_id" fieldText="Location" /> -->
        <select-option v-model="vmodel.status_id" fieldName="status_id" fieldText="Status" :options="statusesByEntity" required />
        <!-- <select-option v-model="vmodel.event_type_id" fieldName="event_type_id" fieldText="Status" :options="eventTypes" required /> -->
        <input-text v-model="vmodel.live_url" fieldName="live_url" fieldText="LiveUrl" />
        
      </div>
    </div>

    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("Maps") }}</h4>
        <div class="form-group form-control-select">
          <label for="entity">{{ $resources("Location") }}</label>
          <div v-if="locationFocus && vmodel.location" class="col-md-12 existing-v-select">
            <span class="fa fa-map-marker-alt"></span>
            <!-- <img src="../../../assets/images/google-maps-30.png" alt="google autocomplete" style="margin-left:-5px;margin-right:-5px" width="20" height="20"/>  -->
            &nbsp;<span>{{ vmodel.location.name }} </span>
          </div>
          <!-- <input v-validate="'required'" v-model="vmodel.province_id" name="province_id" type="text"> -->
          <v-select ref="select" :filterable="false" :options="locationList" label="place_id" @search="onLocationSearch" @search:blur="onLocationBlur" @search:focus="onLocationFocus" :onChange="onLocationChange">
            <template slot="no-options">
              {{ $resources("TypeToSearchLocation") }}
            </template>
            <template slot="option" slot-scope="option">
                <span v-if="option.existing" class="fa fa-map-marker-alt"></span>
                <img v-else src="../../../assets/images/google-maps-30.png" alt="google autocomplete" style="margin-left:-5px;margin-right:-5px" width="20" height="20"/>
                &nbsp; {{ option.label }}
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected">
                <span v-if="option.existing" class="fa fa-map-marker-alt"></span>
                <img v-else src="../../../assets/images/google-maps-30.png" alt="google autocomplete" style="margin-left:-5px;margin-right:-5px" width="20" height="20"/>
                &nbsp; {{ option.name }}
              </div>
            </template>
          </v-select>
          <span class="small text-danger" v-show="errors.has('province_id')">{{ errors.first('province_id') }}</span>
        </div>
        <div>
          <gmap-map
            :center="center" 
            :zoom="zoom" map-type-id="roadmap" :options="{styles: $appOption('mapStyle'), scrollwheel: scrollwheel, mapTypeControl: false, streetViewControl: false}" class="map-panel">
            <gmap-marker :icon="m.icon"  v-if="m.enabled" :position="m.position" v-for="m in activeMarkers"
              :key="m.id">
              <gmap-info-window :opened="m.ifw">{{m.ifw2text}}</gmap-info-window>
            </gmap-marker>
            <!-- <gmap-info-window :position="reportedCenter" :opened="ifw">
              To show you the bindings are working I will stay on the center of the screen whatever you do :)
              <br/> To show you that even my content is bound to vue here is the number of time you clicked on the map
              <b>{{mapClickedCount}}</b>
            </gmap-info-window> -->
            <!-- <gmap-info-window :position="reportedCenter" :opened="ifw2">{{ifw2text}}</gmap-info-window> -->
            </gmap-map>
        </div>
      </div>
    </div>
    
    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <hr />
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("Poster") }}</h4>
        
        <div class="form-group form-control-select" v-show="!editPoster">
          <!-- <label class="disabled" for="id">{{ $resources("ProfilePicture") }}</label> -->
          <div class="">
            <file-upload
              extensions="gif,jpg,jpeg,png,webp"
              accept="image/png,image/gif,image/jpeg,image/webp"
              name="poster"
              class="btn btn-upload-image"
              post-action=""
              :drop="!editPoster"
              v-model="files"
              @input-filter="inputAvatarFilter"
              @input-file="inputAvatarFile"
              ref="upload">
              <!-- {{$resources("Upload Poster")}} -->
              <img :src="files.length ? files[0].url : model.poster_url ? model.poster_url.high : ''" class="edit-image-preview" alt="">

            </file-upload>
          </div>
        </div>
      </div>
    </div>

    <versioning :model="model" separator/>

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

    <uiv-modal v-model="editPoster" :title="$resources('CropImage')" size="sm" :backdrop="false">
      <div class="" v-show="files.length && editPoster" >
        <div class="img-cropper-container" v-if="files.length">
          <img ref="editImage" :src="files[0].url" />
        </div>
      </div>
      <div slot="footer">
        <uiv-btn type="danger" @click.prevent="$refs.upload.clear">{{ $resources("Cancel") }}</uiv-btn>
        <uiv-btn type="success" @click="editPosterSave(false)">{{ $resources("Crop") }}</uiv-btn>
        <uiv-btn type="primary" @click="editPosterSave(true)">{{ $resources("Original") }}</uiv-btn>
      </div>
    </uiv-modal>

    <uiv-modal v-model="deleteModal" :title="$resources('DeleteConfirmation')">
      <span><b>{{ $resources("Msg_DeleteConfirmation", $resources("Event"), model.name) }}</b></span>
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
import { ENTITY, DEFAULT_MARKER } from '@/config'
// import axios from 'axios'
import VueSelect from 'vue-select'
import * as _ from 'lodash'
import Cropper from 'cropperjs'
import FileUpload from 'vue-upload-component'

export default {
  props: ['model', 'isEditing'],
  data () {
    return {
      startTime: new Date(),
      finishTime: new Date(),
      date: new Date(),
      vmodel: {},
      statusesByEntity: this.$store.getters.getStatusByEntity('EVENT'),
      eventTypes: this.$store.getters.get(ENTITY.EVENT_TYPE.ALL),
      participantTypes: this.$store.getters.get(ENTITY.PARTICIPANT_TYPE.ALL),
      deleteModal: false,
      locationList: [],
      editPoster: false,
      files: [],
      center: {
        lat: -7.762500299999999,
        lng: 110.38972650000005
      },
      zoom: 15,
      markers: [],
      ifw: true,
      ifw2: false,
      ifw2text: '',
      mapStyle: 'light-grey',
      scrollwheel: true,
      locationFocus: true
    }
  },
  created () {
    this.vmodel = Object.assign({}, this.model)
    if (this.vmodel.location) {
      var geo = { lat: parseFloat(this.model.location.latitude), lng: parseFloat(this.model.location.longitude) }
      this.center = geo
      this.markers.push({
        ...DEFAULT_MARKER,
        position: geo,
        ifw: true,
        ifw2text: this.model.location.name + ', ' + this.model.location.formatted_address
      })
    }
    if ($.isEmptyObject(this.statusesByEntity)) {
      this.$store.dispatch('getStatusByEntity', {
        entity: 'EVENT',
        option: true
      })
      .then(result => {
        this.statusesByEntity = Object.assign({}, result.model)
      })
    }
    if ($.isEmptyObject(this.eventTypes)) {
      this.$store.dispatch('getActive', {
        entity: ENTITY.EVENT_TYPE
      })
      .then(result => {
        this.eventTypes = Object.assign({}, result.model)
      })
    }
  },
  updated () {
    $(this.$refs.status_id).selectpicker('refresh')
  },
  mounted: function () {
  },
  computed: {
    activeMarkers () {
      return this.markers
    }
  },
  methods: {
    onLocationFocus () {
      this.$data.locationFocus = false
    },
    onLocationBlur () {
      this.$data.locationFocus = this.$refs.select.isValueEmpty
    },
    onLocationSearch (search, loading) {
      loading(true)
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      vm.$store.dispatch('placeOptions', { 'terms': search })
      .then(result => {
        loading(false)
        vm.locationList = result
      })
    }, 500),
    onLocationChange (val) {
      this.markers = []
      var geo = { lat: parseFloat(val.lat), lng: parseFloat(val.lng) }
      if (val.id) {
        this.markers.push({
          ...DEFAULT_MARKER,
          position: geo,
          ifw: true,
          ifw2text: val.label
        })
        this.center = geo
        this.vmodel.location_id = val.id
        this.vmodel.place_id = val.place_id
      } else {
        this.$store.dispatch('addLocationByPlaceId', {
          place_id: val.place_id
        })
        .then(result => {
          var geo = { lat: parseFloat(result.latitude), lng: parseFloat(result.longitude) }
          this.markers.push({
            ...DEFAULT_MARKER,
            position: geo,
            ifw: true,
            ifw2text: result.formatted_address
          })
          this.center = geo
          this.vmodel.location_id = result.id
          this.vmodel.place_id = result.place_id
        })
      }
    },
    populateTime () {
      var startTimeTmp = new Date(this.date)
      startTimeTmp.setHours(this.startTime.getHours())
      startTimeTmp.setMinutes(this.startTime.getMinutes())
      this.vmodel.start_time = startTimeTmp.toISOString().slice(0, 19).replace('T', ' ')

      var finishTimeTmp = new Date(this.date)
      finishTimeTmp.setHours(this.finishTime.getHours())
      finishTimeTmp.setMinutes(this.finishTime.getMinutes())
      this.vmodel.finish_time = finishTimeTmp.toISOString().slice(0, 19).replace('T', ' ')
    },
    saveEvent () {
      this.$validator.validateAll().then(result => {
        this.populateTime()
        if (!this.vmodel.location_id) {
          result = false
        }

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
      this.$router.push({name: 'EventList'})
    },

    /**
     * Column delete action.
     */
    deleteAction () {
      this.$data.deleteModal = false
      this.$emit('remove', this.model.id)
    },
    createImage (file) {
      // var image = new Image()
      var reader = new FileReader()
      var vm = this.vmodel

      reader.onload = (e) => {
        vm.poster = e.target.result
      }
      reader.readAsDataURL(file)
    },
    editPosterSave (original) {
      this.editPoster = false
      if (!original) {
        let oldFile = this.files[0]
        let binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
        let arr = new Uint8Array(binStr.length)
        for (let i = 0; i < binStr.length; i++) {
          arr[i] = binStr.charCodeAt(i)
        }
        let file = new File([arr], oldFile.name, { type: oldFile.type })
        this.$refs.upload.update(oldFile.id, {
          file,
          type: file.type,
          size: file.size,
          active: false
        })
        this.createImage(file)
      } else {
        this.createImage(this.files[0].file)
      }
    },
    inputAvatarFile (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.editPoster = true
        })
      }
      if (!newFile && oldFile) {
        this.editPoster = false
      }
    },
    inputAvatarFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          alert('Your choice is not a picture')
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    }
  },
  watch: {
    'model': function () {
      this.vmodel = Object.assign({}, this.model)
      this.$data.startTime = this.$convertUTCDateToLocalDate(this.model.start_time)
      this.$data.finishTime = this.$convertUTCDateToLocalDate(this.model.finish_time)
      this.$data.date = this.$convertUTCDateToLocalDate(this.model.start_time)
      console.log('date', this.$data.date)
      if (this.model.location) {
        var geo = { lat: parseFloat(this.model.location.latitude), lng: parseFloat(this.model.location.longitude) }
        this.center = geo
        this.markers.push({
          ...DEFAULT_MARKER,
          position: geo,
          ifw: true,
          ifw2text: this.model.location.name + ', ' + this.model.location.formatted_address
        })
      }
    },
    'editPoster': function (value) {
      if (value) {
        this.$nextTick(function () {
          if (!this.$refs.editImage) {
            return
          }
          let cropper = new Cropper(this.$refs.editImage, {
            // aspectRatio: 1 / 1,
            viewMode: 1,
            autoCrop: true
          })
          this.cropper = cropper
        })
      } else {
        if (this.cropper) {
          this.cropper.destroy()
          this.cropper = false
        }
      }
    }
  },
  components: {
    versioning: Versioning,
    selectOption: SelectOption,
    inputTextArea: InputTextArea,
    inputText: InputText,
    vSelect: VueSelect,
    FileUpload
  }
}
</script>

<style scoped>
  .vue-map-container {
    height: 300px;
  }
</style>
