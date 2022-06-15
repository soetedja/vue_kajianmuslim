<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Add") }} <b>{{ $resources("LocationType") }}</b></h2>
              <p>{{ $resources("SubTitleCreateLocationTypes") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <location-type-form
            @save="add"
            :model="model"
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
          entity: ENTITY.LOCATION_TYPE,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'LocationTypeList'})
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
