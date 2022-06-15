<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Edit") }} <b>{{ $resources("ParticipantType") }}</b></h2>
              <p>{{ $resources("SubTitleManageParticipantTypes") }} </p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <participant-type-form
            @save="update"
            @remove="remove"
            :model="model"
            :isEditing="true" 
            >
          </participant-type-form>
        </div>
    </div>
  </div>
</template>


<script>
import ParticipantTypeForm from './_ParticipantTypeForm'
import { ENTITY } from '@/config'

export default {
  created () {
    this.model = this.$store.getters.getById(
      this.$route.params['id'],
      ENTITY.PARTICIPANT_TYPE
    )

    if (!this.model.name) {
      this.$store.dispatch('getById', {
        entity: ENTITY.PARTICIPANT_TYPE.SINGLE,
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
          entity: ENTITY.PARTICIPANT_TYPE,
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
          entity: ENTITY.PARTICIPANT_TYPE,
          id: id
        })
        .then(result => {
          this.$router.push({ name: 'ParticipantTypeList' })
        })
        .catch(error => {
          console.log('error: ', error)
        })
    }
  },
  components: {
    participantTypeForm: ParticipantTypeForm
  }
}
</script>
