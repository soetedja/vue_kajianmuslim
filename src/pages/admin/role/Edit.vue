<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Edit") }} <b>{{ $resources("Role") }}</b></h2>
              <p>{{ $resources("SubTitleEditRole") }} </p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <role-form
            @save="update"
            @remove="remove"
            :model="model"
            :isEditing="true" 
            >
          </role-form>
        </div>
    </div>
  </div>
</template>


<script>
import RoleForm from './_RoleForm'
import { ENTITY } from '@/config'

export default {
  created () {
    // Always get the latest data for entity relationship
    this.$store.dispatch('getById', {
      entity: ENTITY.ROLE.SINGLE,
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
          entity: ENTITY.ROLE,
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
          entity: ENTITY.ROLE,
          id: id
        })
        .then(result => {
          this.$router.push({ name: 'RoleList' })
        })
        .catch(error => {
          console.log('error: ', error)
        })
    }
  },
  components: {
    roleForm: RoleForm
  }
}
</script>
