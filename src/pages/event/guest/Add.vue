<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Add") }} <b>{{ $resources("Guest") }}</b></h2>
              <p>{{ $resources("SubTitleCreateGuests") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <guest-form
            @save="add"
            :model="model"
            >
          </guest-form>
        </div>
    </div>
  </div>
</template>


<script>
  import GuestForm from './_GuestForm'
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
          entity: ENTITY.GUEST,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'GuestList'})
        })
        .catch(error => {
          console.log('error: ', error)
        })
      }
    },
    components: {
      guestForm: GuestForm
    }
  }
</script>
