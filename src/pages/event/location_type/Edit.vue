<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Edit") }} <b>{{ $resources("LocationType") }}</b></h2>
              <p>{{ $resources("SubTitleManageLocationTypes") }} </p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <location-type-form
            @save="update"
            @remove="remove"
            :model="model"
            :isEditing="true" 
            >
          </location-type-form>
        </div>
    </div>
  </div>
</template>


<script>
import LocationTypeForm from './_LocationTypeForm'
import { ENTITY } from '@/config'

export default {
  created () {
    this.model = this.$store.getters.getById(
      this.$route.params['id'],
      ENTITY.LOCATION_TYPE
    )

    if (!this.model.name) {
      this.$store.dispatch('getById', {
        entity: ENTITY.LOCATION_TYPE.SINGLE,
        id: this.$route.params['id']
      })
      .then(result => {
        this.model = result
      })
    }
  },
  data () {
    return {
      model: {}
    }
  },
  computed: {
  },
  methods: {
    update (model) {
      this.$store
        .dispatch('update', {
          entity: ENTITY.LOCATION_TYPE,
          id: this.$route.params['id'],
          data: model
        })
        .then(result => {
          this.model = result
        })
        .catch(error => {
          console.log('error: ', error)
        })
    },
    remove (id) {
      this.$store
        .dispatch('remove', {
          entity: ENTITY.LOCATION_TYPE,
          id: id
        })
        .then(result => {
          this.$router.push({ name: 'LocationTypeList' })
        })
        .catch(error => {
          console.log('error: ', error)
        })
    }
  },
  components: {
    locationTypeForm: LocationTypeForm
  }
}
</script>
