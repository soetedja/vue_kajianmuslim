<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Developer") }} <b>{{ $resources("Playground") }}</b></h2>
              <p>Research</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <div class="col-xs-6">
            <h4 class="category">Authentication</h4>
            <hr />
            <div class="form-group new-button">
              <a @click="login()" class="button btn btn-primary">
                <i class="fa fa-chevron-circle-left fa-fw"></i>
                <span>Test Login</span>
              </a>
              <a @click="activeSession()" class="button btn btn-primary">
                <i class="fa fa-chevron-circle-left fa-fw"></i>
                <span>Active Session</span>
              </a>
              <a @click="logout()" class="button btn btn-primary">
                <i class="fa fa-chevron-circle-left fa-fw"></i>
                <span>Test Logout</span>
              </a>
              
              <a @click="testAuth()" class="button btn btn-primary">
                <i class="fa fa-chevron-circle-left fa-fw"></i>
                <span>Test Auth</span>
              </a>
            </div>
            <pre> {{ session }} </pre>
          </div>
          <div class="col-xs-6">
            <h4 class="category">Search Select </h4>
            <hr />
            <div class="form-group new-button">
              <label>Basic</label>
              <model-select :options="options2" 
                v-model="item2"
                placeholder="select item2">
              </model-select><br/>
              <pre> {{ item2 }} </pre>
            </div>
            <div class="form-group new-button">
              <label>Ajax</label>
              <model-list-select :list="allProvinces"
                option-value="id"
                :custom-text="optionDisplayText"
                v-model="selectedProvince"
                placeholder="Province"
                @searchchange="printSearchText">
              </model-list-select><br/>
              <pre> {{ selectedProvince }} </pre>
            </div>
          </div>
          <div class="col-xs-6">
            <form @submit.prevent="saveImage">
              <div v-if="!image">
                <h4 class="category">Basic Upload</h4>
                <hr />
                <input type="file" @change="onFileChange">
              </div>
              <div v-else>
                <img :src="image" />
                <button @click="removeImage">Remove image</button>
              </div>
              <button class="button btn btn-primary">
                <i class="fa fa-save fa-fw"></i>
                <span> {{ $resources("Save") }}</span>
              </button>
            </form>
            <hr />
            <h4 class="category">Advanced Upload</h4>
            <hr />
            <a @click="gotoAvatarPage()" class="button btn btn-primary">
              <i class="fa fa-chevron-circle-left fa-fw"></i>
              <span>Change Avatar</span>
            </a>
          </div>
          <div class="col-xs-6">
            <label>Vue select </label>
            <v-select v-model="selected" label="name"  :options="$allProvinces()" :onChange="onSelectChange"></v-select>          
            <hr />
            <label>Vue select ajax + icon </label>
            <v-select label="name" :filterable="false" :options="allProvinces" @search="onSearch">
              <template slot-scope="no-options">
                type to search GitHub repositories..
              </template>
              <template slot-scope="option">
                <div class="d-center">
                  <img :src='option.owner.avatar_url'/> 
                  {{ option.full_name }}
                  </div>
              </template>
            </v-select>
            <hr />
          </div>
          <div class="col-xs-6">
          <h4 class="category">Maps </h4>
          <hr />
            <gmap-map
              :center="center"
              :zoom="7"
              style="width: 500px; height: 300px"
            >
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="center=m.position"
            ></gmap-marker>
            </gmap-map>
            <hr />
            <a @click="gotoMapPage()" class="button btn btn-primary">
              <i class="fa fa-chevron-circle-left fa-fw"></i>
              <span>Advanced Map</span>
            </a>
          </div>
        </div>
    </div>
  </div>
</template>


<script>
//   import PrivilegeForm from './_PrivilegeForm'
  import { ENTITY } from '@/config'
  import { SUCCESS_MSG, ERROR_MSG } from '@/store/base/mutation-types'
  import { ModelSelect, ModelListSelect } from 'vue-search-select'
  import axios from 'axios'
  import VueSelect from 'vue-select'

  export default {
    created () {
      this.searchAnimation()
    },
    data () {
      return {
        selected: null,
        options: [],
        session: {},
        image: '',
        options2: [
          { value: 'Yogya', text: 'Yogya' },
          { value: 'Solo', text: 'Solo' },
          { value: 'Jakarta', text: 'Jakarta' }
        ],
        allProvinces: [],
        selectedProvince: '',
        item2: 'Solo',
        center: {lat: 10.0, lng: 10.0},
        markers: [{
          position: {lat: 10.0, lng: 10.0}
        }, {
          position: {lat: 11.0, lng: 11.0}
        }]
      }
    },
    computed: {
    },
    methods: {
      onSelectChange (val) {
        console.log('change', val)
      },
      onSearch (search, loading) {
        loading(true)
        axios.get(`http://localhost/Kajianmuslim.id/api/v1/province`)
        .then(response => {
          loading(false)
          this.allProvinces = response.data.contents.model
        })
        .catch(error => {
          console.log(error)
        })
      },
      gotoMapPage () {
        this.$router.push({name: 'MapPlayground'})
      },
      gotoAvatarPage () {
        this.$router.push({name: 'UploadAvatar'})
      },
      saveImage () {
        this.$store
          .dispatch('saveImage', {
            data: this.image
          })
          .then(result => {
            console.log(result)
          })
          .catch(error => {
            console.log('error: ', error)
          })
      },
      activeSession () {
        this.$store.dispatch('activeSession', {})
        .then(result => {
          this.session = result
          console.log(result)
        })
        .catch(error => {
          console.log('error: ', error)
        })
      },
      login () {
        this.$store
          .dispatch('login', {
            data: {
              username: 'test@test.com',
              password: 'Password'
            }
          })
          .then(response => {
            if (response.valid === true) {
              this.$store.dispatch('getSignedInUser')
              this.$store.commit(SUCCESS_MSG, {
                title: this.$resources('SuccessLogin'),
                message: this.$resources('Welcome', response.name)
              })
            } else {
              this.$store.commit(ERROR_MSG, {
                title: this.$resources('FailedToLogin'),
                message: this.$resources('InvalidUsernamePassword')
              })
            }
          })
          .catch(error => {
            console.log('error: ', error)
          })
      },
      logout () {
        this.$store.dispatch('logout')
      },
      testAuth () {
        this.$store.dispatch('getById', {
          entity: ENTITY.PRIVILEGE.SINGLE,
          id: 17
        })
      },
      onFileChange (e) {
        var files = e.target.files || e.dataTransfer.files
        console.log(files)
        if (!files.length) {
          return
        }
        this.createImage(files[0])
      },
      createImage (file) {
        // var image = new Image()
        var reader = new FileReader()
        var vm = this

        reader.onload = (e) => {
          vm.image = e.target.result
        }
        reader.readAsDataURL(file)
      },
      removeImage: function (e) {
        this.image = ''
      },
      /**
       * api : https://qiita.com/AKB428/items/64938febfd4dcf6ea698
       */
      searchAnimation () {
        if (this.allProvinces.length === 0) {
          axios.get(`http://localhost/Kajianmuslim.id/api/v1/province`)
            .then(response => {
              this.allProvinces = response.data.contents.model
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
      printSearchText (searchText) {
        this.searchText2 = searchText
      },
      optionDisplayText (item) {
        return `${item.name}`
      }
    },
    components: {
      ModelSelect,
      ModelListSelect,
      vSelect: VueSelect
    }
  }
</script>

<style scoped>
</style>