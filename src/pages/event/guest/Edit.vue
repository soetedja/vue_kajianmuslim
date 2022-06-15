<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Edit") }} <b>{{ $resources("Guest") }}</b></h2>
              <p>{{ $resources("SubTitleManageGuests") }} </p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <guest-form
            @save="update"
            @remove="remove"
            :model="model"
            :isEditing="true" 
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
    this.model = this.$store.getters.getById(
      this.$route.params['id'],
      ENTITY.GUEST
    )

    if (!this.model.name) {
      this.$store.dispatch('getById', {
        entity: ENTITY.GUEST.SINGLE,
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
          entity: ENTITY.GUEST,
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
          entity: ENTITY.GUEST,
          id: id
        })
        .then(result => {
          this.$router.push({ name: 'GuestList' })
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
