<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Edit") }} <b>{{ $resources("Location") }}</b></h2>
              <p>{{ $resources("SubTitleManageLocations") }} </p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <location-form
            @save="update"
            @remove="remove"
            :model="model"
            :isEditing="true" 
            >
          </location-form>
        </div>
    </div>
  </div>
</template>


<script>
import LocationForm from './_LocationForm'
import { ENTITY } from '@/config'

export default {
  created () {
    this.model = this.$store.getters.getById(
      this.$route.params['id'],
      ENTITY.LOCATION
    )

    if (!this.model.name) {
      this.$store.dispatch('getById', {
        entity: ENTITY.LOCATION.SINGLE,
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
          entity: ENTITY.LOCATION,
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
          entity: ENTITY.LOCATION,
          id: id
        })
        .then(result => {
          this.$router.push({ name: 'LocationList' })
        })
        .catch(error => {
          console.log('error: ', error)
        })
    }
  },
  components: {
    locationForm: LocationForm
  }
}
</script>
