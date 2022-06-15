<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Add") }} <b>{{ $resources("Role") }}</b></h2>
              <p>{{ $resources("SubTitleCreateRole") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <role-form
            @save="add"
            :model="model"
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
          entity: ENTITY.ROLE,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'RoleList'})
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
