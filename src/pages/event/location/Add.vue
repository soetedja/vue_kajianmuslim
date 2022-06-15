<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Add") }} <b>{{ $resources("Location") }}</b></h2>
              <p>{{ $resources("SubTitleCreateLocations") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <location-form
            @save="add"
            :model="model"
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
        this.$store.dispatch('add', {
          entity: ENTITY.LOCATION,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'LocationList'})
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
