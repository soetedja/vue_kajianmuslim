<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Edit") }} <b>{{ $resources("Event") }}</b></h2>
              <p>{{ $resources("SubTitleManageEvents") }} </p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <event-form
            @save="update"
            @remove="remove"
            :model="model"
            :isEditing="true" 
            >
          </event-form>
        </div>
    </div>
  </div>
</template>


<script>
import EventForm from './_EventForm'
import { ENTITY } from '@/config'

export default {
  created () {
    this.model = this.$store.getters.getById(
      this.$route.params['id'],
      ENTITY.EVENT
    )

    if (!this.model.name) {
      this.$store.dispatch('getById', {
        entity: ENTITY.EVENT.SINGLE,
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
          entity: ENTITY.EVENT,
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
          entity: ENTITY.EVENT,
          id: id
        })
        .then(result => {
          this.$router.push({ name: 'EventList' })
        })
        .catch(error => {
          console.log('error: ', error)
        })
    }
  },
  components: {
    eventForm: EventForm
  }
}
</script>
