<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Add") }} <b>{{ $resources("GuestType") }}</b></h2>
              <p>{{ $resources("SubTitleCreateGuestTypes") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <guest-type-form
            @save="add"
            :model="model"
            >
          </guest-type-form>
        </div>
    </div>
  </div>
</template>


<script>
  import GuestTypeForm from './_GuestTypeForm'
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
          entity: ENTITY.GUEST_TYPE,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'GuestTypeList'})
        })
        .catch(error => {
          console.log('error: ', error)
        })
      }
    },
    components: {
      guestTypeForm: GuestTypeForm
    }
  }
</script>
