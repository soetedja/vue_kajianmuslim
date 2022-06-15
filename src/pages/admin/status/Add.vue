<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Add") }} <b>{{ $resources("Status") }}</b></h2>
              <p>{{ $resources("SubTitleCreateStatus") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <status-form
            @save="add"
            :model="model"
            >
          </status-form>
        </div>
    </div>
  </div>
</template>


<script>
  import StatusForm from './_StatusForm'
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
          entity: ENTITY.STATUS,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'StatusList'})
        })
        .catch(error => {
          console.log('error: ', error)
        })
      }
    },
    components: {
      statusForm: StatusForm
    }
  }
</script>
