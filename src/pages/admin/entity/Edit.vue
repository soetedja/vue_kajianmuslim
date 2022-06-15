<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Edit") }} <b>{{ $resources("Entity") }}</b></h2>
              <p>{{ $resources("SubTitleEditEntity") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <entity-form
            @save="update"
            @remove="remove"
            :model="model"
            :isEditing="true" 
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
    // Always get the latest data for entity relationship
    this.$store.dispatch('getById', {
      entity: ENTITY.ENTITY.SINGLE,
      id: this.$route.params['id']
    }).then(result => {
      this.model = result
    })
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
          entity: ENTITY.ENTITY,
          id: this.$route.params['id'],
          data: model
        })
        .then(result => {})
        .catch(error => {
          console.log('error: ', error)
        })
    },
    remove (id) {
      this.$store
        .dispatch('remove', {
          entity: ENTITY.ENTITY,
          id: id
        })
        .then(result => {
          this.$router.push({ name: 'EntityList' })
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
