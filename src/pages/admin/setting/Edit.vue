<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>Entity <b>Edit</b></h2>
              <p>{{ $resources("SubTitleEditSetting") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <setting-form
            @save="update"
            @remove="remove"
            :model="model"
            :isEditing="true" 
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
    if (!this.model.name) {
      this.$store.dispatch('getById', {
        setting: ENTITY.ENTITY.SINGLE,
        id: this.$route.params['id']
      })
    }
  },
  data () {
    return {}
  },
  computed: {
    model () {
      const settingById = this.$store.getters.getById(
        this.$route.params['id'],
        ENTITY.ENTITY
      )
      return Object.assign({}, settingById)
    }
  },
  methods: {
    update (model) {
      this.$store
        .dispatch('update', {
          setting: ENTITY.ENTITY,
          id: this.$route.params['id'],
          data: model
        })
        .then(result => {})
        .catch(error => {
          console.log('error: ', error)
        })
    },
    remove (id) {
      this.$store
        .dispatch('remove', {
          setting: ENTITY.ENTITY,
          id: id
        })
        .then(result => {
          this.$router.push({ name: 'EntityList' })
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
