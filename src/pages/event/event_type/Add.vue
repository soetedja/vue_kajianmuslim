<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>EventType <b>Add</b></h2>
              <p>Create new eventType</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <eventType-form
            @save="add"
            :model="model"
            >
          </eventType-form>
        </div>
    </div>
  </div>
</template>


<script>
  import EventTypeForm from './_EventTypeForm'
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
          entity: ENTITY.EVENT_TYPE,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'EventTypeList'})
        })
        .catch(error => {
          console.log('error: ', error)
        })
      }
    },
    components: {
      eventTypeForm: EventTypeForm
    }
  }
</script>
