<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>Setting <b>Add</b></h2>
              <p>{{ $resources("SubTitleCreateSetting") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <setting-form
            @save="add"
            :model="model"
            >
          </setting-form>
        </div>
    </div>
  </div>
</template>


<script>
  import SettingForm from './_SettingForm'
  import { ENTITY } from '@/config'
  export default {
    created () {
    },
    data () {
      return {
        model: {}
      }
    },
    computed: {
    },
    methods: {
      add (model) {
        console.log(model)
        this.$store.dispatch('add', {
          setting: ENTITY.ENTITY,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'SettingList'})
        })
        .catch(error => {
          console.log('error: ', error)
        })
      }
    },
    components: {
      settingForm: SettingForm
    }
  }
</script>
