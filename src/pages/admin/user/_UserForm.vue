<template>
  <form @submit.prevent="saveStatus">
    <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("GeneralInformation") }}</h4>
        <input-text v-model="vmodel.id" fieldName="id" fieldText="Id" required disabled/>
        <input-text v-model="vmodel.username" fieldName="username" fieldText="Username" required/>
        <input-text v-model="vmodel.first_name" fieldName="first_name" fieldText="FirstName" required/>
        <input-text v-model="vmodel.last_name" fieldName="last_name" fieldText="LastName" />
        <input-text v-model="vmodel.email" fieldName="email" fieldText="Email" required email/>
        <select-option v-model="vmodel.status_id" fieldName="status_id" fieldText="Status" :options="statusesByEntity" required/>
        <input-text v-model="vmodel.language" fieldName="language" fieldText="Language" />
        <input-text v-model="vmodel.gender" fieldName="gender" fieldText="Gender" />
        <input-text v-model="vmodel.oauth_id" fieldName="oauth_id" fieldText="OauthId" disabled />
        <input-text v-model="vmodel.oauth_provider" fieldName="oauth_provider" fieldText="OauthProvider" disabled />
        <hr />
        <h4 class="category">{{ $resources("AdditionalInformation") }}</h4>
        <!-- <child v-model="vmodel.username"></child> -->
        <input-text v-model="vmodel.occupation" fieldName="occupation" fieldText="Occupation" />
        <input-text v-model="vmodel.gplus_link" fieldName="gplus_link" fieldText="GPlusLink" />
        <input-text v-model="age_range" fieldName="age_range" fieldText="AgeRange" disabled />
      </div>
    </div>
    <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("ProfilePicture") }}</h4>
        
        <div class="form-group form-control-select" v-show="!edit">
          <!-- <label class="disabled" for="id">{{ $resources("ProfilePicture") }}</label> -->
          <!-- <div class="col-xs-6">
            <img :src="files.length ? files[0].url : model.picture_url" class="img-circle" :alt="vmodel.first_name" height="96" width="96">
          </div> -->
          <div class="col-xs-6">
            <file-upload
              extensions="gif,jpg,jpeg,png,webp"
              accept="image/png,image/gif,image/jpeg,image/webp"
              name="picture"
              class="btn btn-upload-image"
              post-action=""
              :drop="!edit"
              :size="1024 * 1024 * 10"
              v-model="files"
              @input-filter="inputAvatarFilter"
              @input-file="inputAvatarFile"
              ref="upload">
              <img :src="files.length ? files[0].url : model.picture_url ? model.picture_url.original : ''" class="edit-image-preview" alt="" width="70">
            </file-upload>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
      <hr />
      <div class="sidebar-block">
        <div class="form-group">
          <label class="control-label col-xs-2" for="verified">{{ $resources("Verified") }}</label>
          <div class="col-xs-4 text-center" style="margin-top: 5px;">
            <toggle-button disabled :sync="true" v-model="verified"/>
            <p v-if="vmodel.verified"> {{ $resources("Verified") }}</p>
            <p v-else> {{ $resources("NotVerified") }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
      <hr/>
      <div class="sidebar-block">
        <h4 class="category">{{ $resources("Relationship") }}</h4>
        <div class="form-group form-control-select">
          <label for="entity">{{ $resources("DefaultRole") }}</label>
          <treeselect
            v-model="vmodel.default_role"
            :default-expand-level="1"
            :multiple="false"
            :options="activeRoles"
            :load-root-options="loadRootOptions" 
            />
            <span class="small text-danger" v-show="errors.has('entity')">{{ errors.first('entity') }}</span>
        </div>
        <div class="form-group form-control-select">
          <label for="entity">{{ $resources("AdditionalRoles") }}</label>
          <treeselect
            v-model="vmodel.roles"
            :default-expand-level="1"
            :multiple="true"
            :options="activeRoles"
            :load-root-options="loadRootOptions" 
            />
            <span class="small text-danger" v-show="errors.has('entity')">{{ errors.first('entity') }}</span>
        </div>
      </div>
    </div>
    
    <versioning :model="model" separator="true"/>
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

    <uiv-modal v-model="edit" :title="$resources('CropImage')" size="sm" :backdrop="false" class="col-md-4">
      <div class="avatar-edit" v-show="files.length && edit" >
        <div class="avatar-edit-image" v-if="files.length">
          <img ref="editImage" :src="files[0].url" />
        </div>
      </div>
      <div slot="footer">
        <uiv-btn @click.prevent="$refs.upload.clear">{{ $resources("Cancel") }}</uiv-btn>
        <uiv-btn type="primary" @click.prevent="editAvatarSave">{{ $resources("Crop") }}</uiv-btn>
      </div>
    </uiv-modal>

    <uiv-modal v-model="deleteModal" :title="$resources('DeleteConfirmation')">
      <span><b>{{ $resources("Msg_DeleteConfirmation", $resources("User"), model.email) }}</b></span>
      <div slot="footer">
        <uiv-btn @click="deleteModal=false">{{ $resources("Cancel") }}</uiv-btn>
        <uiv-btn type="danger" @click="deleteAction()">{{ $resources("Save") }}</uiv-btn>
      </div>
    </uiv-modal>
  </form>
</template>

<script>
import Versioning from '@/components/admin/Versioning'
import SelectOption from '@/components/common/SelectOption'
import InputText from '@/components/common/InputText'
import { VALIDATION_ERROR } from '@/store/base/mutation-types'
import { ENTITY } from '@/config'
import Treeselect from '@riophae/vue-treeselect'
import Cropper from 'cropperjs'
import FileUpload from 'vue-upload-component'

export default {
  props: ['model', 'isEditing'],
  data () {
    return {
      deleteModal: false,
      vmodel: {},
      age_range: '',
      statusesByEntity: this.$store.getters.getStatusByEntity('USER'),
      files: [],
      edit: false,
      cropper: false
    }
  },
  created () {
    if ($.isEmptyObject(this.statusesByEntity)) {
      this.$store.dispatch('getStatusByEntity', {
        entity: 'USER',
        option: true
      })
      .then(result => {
        this.statusesByEntity = Object.assign({}, result.model)
      })
    }

    if (!this.model.picture_url) {
      this.model.picture_url = 'https://dev.kajianmuslim.id/static/images/blank-profile-picture.png'
    }
    this.vmodel = Object.assign({}, this.model)
    this.age_range = this.model.age_min + ' - ' + this.model.age_max
  },
  updated () {
  },
  mounted: function () {
  },
  computed: {
    activeRoles () {
      var roles = this.$store.getters.get(ENTITY.ROLE.ACTIVE)
      if (!$.isEmptyObject(roles)) {
        return $.fn.populateTreeSelect(roles)
      }

      this.$store.dispatch('getActive', {
        entity: ENTITY.ROLE
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
          this.vmodel.roles = $.fn.populateSelectedOption(this.vmodel.roles, $.fn.populateTreeSelect(this.$store.getters.get(ENTITY.ROLE.ACTIVE)))
          this.$emit('save', this.vmodel)
          return
        }
        this.$store.commit(VALIDATION_ERROR, {})
      })
    },
    loadRootOptions (callback) {
      callback(null, $.fn.populateTreeSelect(this.$store.getters.get(ENTITY.ROLE.ACTIVE)))
    },
    deleteConfirm () {
      this.$data.deleteModal = true
    },
    back () {
      this.$router.push({name: 'UserList'})
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
    editAvatarSave () {
      this.edit = false
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
    },
    inputAvatarFile (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false
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
      this.age_range = this.model.age_min + ' - ' + this.model.age_max
      this.vmodel.roles = $.fn.loadTreeOption(this.model.roles, this.activeRoles)
    },
    'activeRoles': function () {
      this.vmodel.roles = $.fn.loadTreeOption(this.model.roles, this.activeRoles)
    },
    'edit': function (value) {
      if (value) {
        this.$nextTick(function () {
          if (!this.$refs.editImage) {
            return
          }
          let cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: 1 / 1,
            viewMode: 1
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
    inputText: InputText,
    treeselect: Treeselect,
    FileUpload
  }
}
</script>

<style>
.modal-body {
  max-width: 750px;
}

@media only screen and (max-width: 360px) {
  .modal-body {
    max-width: 33.3%;
  }
}

@media only screen and (max-width: 420px) {
  .modal-body {
    max-width: 37%;
  }
}
</style>