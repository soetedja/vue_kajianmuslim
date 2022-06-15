<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Add") }} <b>{{ $resources("ParticipantType") }}</b></h2>
              <p>{{ $resources("SubTitleCreateParticipantTypes") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <participant-type-form
            @save="add"
            :model="model"
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
          entity: ENTITY.PARTICIPANT_TYPE,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'ParticipantTypeList'})
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
