<template>
  <form @submit.prevent="saveGuest">
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("GeneralInformation") }}</h4>
        <input-text v-model="vmodel.id" fieldName="id" fieldText="Id" required disabled hidden/>
        <input-text v-model="vmodel.alias" fieldName="alias" fieldText="Alias" placeholder="Ust. Fulan" required />
        <input-text-area v-model="vmodel.short_description" fieldName="short_description" fieldText="ShortDescription" />
        <select-option v-model="vmodel.guest_type_id" fieldName="guest_type_id" fieldText="GuestType" :options="guestTypes" required />
        <input-text-area v-model="vmodel.address_line_1" fieldName="address_line_1" fieldText="AddressLine1" />
        <!-- <input-text-area v-model="vmodel.address_line_2" fieldName="address_line_2" fieldText="AddressLine2" /> -->
        <!-- <select-option v-model="vmodel.province_id" fieldName="province_id" fieldText="Province" :options="provinces" required /> -->
        <div class="form-group form-control-select">
          <label for="entity">{{ $resources("Province") }}</label>
          <input v-validate="'required'" v-model="vmodel.province_id" name="province_id" type="hidden">
          <model-list-select 
            :list="$allProvinces()"
            option-value="id"
            :custom-text="optionDisplayLocationText"
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
            :custom-text="optionDisplayLocationText"
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
            :custom-text="optionDisplayLocationText"
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
            :custom-text="optionDisplayLocationText"
            v-model="vmodel.village_id"
            :placeholder="$resources('SelectOption')">
          </model-list-select>
          <!-- <span class="small text-danger" v-show="errors.has('vmodel.regency_id')">{{ errors.first('vmodel.regency_id') }}</span> -->
        </div>
        <input-text v-model="vmodel.postal_code" fieldName="postal_code" fieldText="PostalCode" />
        <select-option v-model="vmodel.status_id" fieldName="status_id" fieldText="Status" :options="statusesByEntity" required />
      </div>
    </div>

    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("Relationship") }}</h4>
        <div class="form-group form-control-select">
          <label for="entity">{{ $resources("LinkedUser") }}</label>
          <div v-if="linkedUserFocus && vmodel.linkedUser" class="col-md-12 existing-v-select">
            <span v-if="!vmodel.linkedUser.picture_url" class="far fa-user"></span>
            <img v-else :src="vmodel.linkedUser.picture_url" alt="" class="img-circle" width="20" height="20"/> 
            &nbsp;<span>{{ vmodel.linkedUser.email }} </span>
          </div>
          <!-- <input v-validate="'required'" v-model="vmodel.province_id" name="province_id" type="text"> -->
          <v-select ref="select" :filterable="false" :options="linkedUserOptions" label="place_id" @search="onLinkedUserSearch" @search:blur="onLocationBlur" @search:focus="onLinkedUserFocus" :onChange="onLocationChange">
            <template slot="no-options">
              {{ $resources("TypeToSearchUser") }}
            </template>
            <template slot="option" slot-scope="option">
                <span v-if="option.existing" class="fa fa-map-marker-alt"></span>
                <img v-else :src="option.picture_url" alt="" class="img-circle" style="margin-left:-5px;margin-right:-5px" width="20" height="20"/>
                &nbsp; {{ option.email ? option.email : $resources("None") }}
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected">
                <span v-if="option.existing" class="fa fa-map-marker-alt"></span>
                <img v-else :src="option.picture_url" alt="" class="img-circle" style="margin-top:-5px;margin-right:-5px" width="20" height="20"/>
                &nbsp; {{ option.email }}
              </div>
            </template>
          </v-select>
          <span class="small text-danger" v-show="errors.has('province_id')">{{ errors.first('province_id') }}</span>
        </div>
        <h4 class="category">{{ $resources("Picture") }}</h4>
        <div class="form-group form-control-select" v-show="!editPicture">
          <!-- <label class="disabled" for="id">{{ $resources("ProfilePicture") }}</label> -->
          <div class="">
            <file-upload
              extensions="gif,jpg,jpeg,png,webp"
              accept="image/png,image/gif,image/jpeg,image/webp"
              name="picture"
              class="btn btn-upload-image"
              post-action=""
              :drop="!editPicture"
              v-model="files"
              @input-filter="inputAvatarFilter"
              @input-file="inputAvatarFile"
              ref="upload">
              <!-- {{$resources("Upload Picture")}} -->
              <img :src="files.length ? files[0].url : model.picture_url ? model.picture_url.original : ''" class="edit-image-preview" alt="" width="70">

            </file-upload>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("Contact") }}</h4>
        <input-text v-model="vmodel.phone_number" fieldName="phone_number" fieldText="PhoneNumber" />
        <input-text v-model="vmodel.instagram" fieldName="instagram" fieldText="Instagram" />
        <input-text v-model="vmodel.youtube_channel" fieldName="youtube_channel" fieldText="YoutubeChannel" />
        <input-text v-model="vmodel.facebook" fieldName="facebook" fieldText="Facebook" />
        <input-text v-model="vmodel.twitter" fieldName="twitter" fieldText="Twitter" />
        <input-text-area v-model="vmodel.notes" fieldName="notes" fieldText="Notes" />
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

    <uiv-modal v-model="editPicture" :title="$resources('CropImage')" size="sm" :backdrop="false">
      <div class="" v-show="files.length && editPicture" >
        <div class="img-cropper-container" v-if="files.length">
          <img ref="editImage" :src="files[0].url" />
        </div>
      </div>
      <div slot="footer">
        <uiv-btn type="danger" @click.prevent="$refs.upload.clear">{{ $resources("Cancel") }}</uiv-btn>
        <uiv-btn type="success" @click="editPictureSave(false)">{{ $resources("Crop") }}</uiv-btn>
        <uiv-btn type="primary" @click="editPictureSave(true)">{{ $resources("Original") }}</uiv-btn>
      </div>
    </uiv-modal>

    <uiv-modal v-model="deleteModal" :title="$resources('DeleteConfirmation')">
      <span><b>{{ $resources("Msg_DeleteConfirmation", $resources("Guest"), model.name) }}</b></span>
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
import { ModelSelect, ModelListSelect } from 'vue-search-select'
import * as _ from 'lodash'
import VueSelect from 'vue-select'
import { ENTITY } from '@/config'
import Cropper from 'cropperjs'
import FileUpload from 'vue-upload-component'

export default {
  props: ['model', 'isEditing'],
  data () {
    return {
      vmodel: {},
      statusesByEntity: this.$store.getters.getStatusByEntity('GUEST'),
      guestTypes: this.$store.getters.get(ENTITY.GUEST_TYPE.ALL),
      deleteModal: false,
      editPicture: false,
      files: [],
      linkedUserOptions: [],
      linkedUserFocus: true,
      regencies: [],
      districts: [],
      villages: []
    }
  },
  created () {
    this.vmodel = Object.assign({}, this.model)
    if ($.isEmptyObject(this.statusesByEntity)) {
      this.$store.dispatch('getStatusByEntity', {
        entity: 'GUEST',
        option: true
      })
      .then(result => {
        this.statusesByEntity = Object.assign({}, result.model)
      })
    }
    if ($.isEmptyObject(this.guestTypes)) {
      this.$store.dispatch('getAll', {
        entity: ENTITY.GUEST_TYPE,
        option: true
      })
      .then(result => {
        this.guestTypes = Object.assign({}, result)
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
    optionDisplayLocationText (item) {
      return `${item.name}`
    },
    optionDisplayText (item) {
      return `${item.email}`
    },
    onLinkedUserFocus () {
      this.$data.linkedUserFocus = false
    },
    onLocationBlur () {
      this.$data.linkedUserFocus = this.$refs.select.isValueEmpty
    },
    onLinkedUserSearch (search, loading) {
      loading(true)
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      vm.$store.dispatch('searchUserByEmail', {
        email: search,
        option: true
      })
      .then(result => {
        loading(false)
        vm.linkedUserOptions = result
      })
    }, 500),
    onLocationChange (val) {
      console.log(val)
      if (val) {
        this.vmodel.user_id = val.id
      }
    },
    saveGuest () {
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
      this.$router.push({name: 'GuestList'})
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
        vm.picture = e.target.result
      }
      reader.readAsDataURL(file)
    },
    editPictureSave (original) {
      this.editPicture = false
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
          this.editPicture = true
        })
      }
      if (!newFile && oldFile) {
        this.editPicture = false
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
    },
    'editPicture': function (value) {
      if (value) {
        this.$nextTick(function () {
          if (!this.$refs.editImage) {
            return
          }
          let cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: 1 / 1,
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
    ModelSelect,
    ModelListSelect,
    FileUpload
  }
}
</script>

<style scoped>

</style>