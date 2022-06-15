<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Add") }} <b>{{ $resources("Entity") }}</b></h2>
              <p>{{ $resources("SubTitleCreateEntity") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <entity-form
            @save="add"
            :model="model"
            >
          </entity-form>
        </div>
    </div>
  </div>
</template>


<script>
  import EntityForm from './_EntityForm'
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
          entity: ENTITY.ENTITY,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'EntityList'})
        })
        .catch(error => {
          console.log('error: ', error)
        })
      }
    },
    components: {
      entityForm: EntityForm
    }
  }
</script>
