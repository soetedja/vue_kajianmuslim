<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Add") }} <b>{{ $resources("Event") }}</b></h2>
              <p>{{ $resources("SubTitleCreateEvents") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <event-form
            @save="add"
            :model="model"
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
    },
    data () {
      return {
        model: {
        }
      }
    },
    computed: {
    },
    methods: {
      add (model) {
        this.$store.dispatch('add', {
          entity: ENTITY.EVENT,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'EventList'})
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
