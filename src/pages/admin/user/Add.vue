<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Add") }} <b>{{ $resources("User") }}</b></h2>
              <p>{{ $resources("SubTitleManageUser") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <user-form
            @save="add"
            :model="model"
            >
          </user-form>
        </div>
    </div>
  </div>
</template>


<script>
  import UserForm from './_UserForm'
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
          entity: ENTITY.USER,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'UserList'})
        })
        .catch(error => {
          console.log('error: ', error)
        })
      }
    },
    components: {
      userForm: UserForm
    }
  }
</script>
