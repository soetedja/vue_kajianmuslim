<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Edit") }} <b>{{ $resources("User") }}</b></h2>
              <p>{{ $resources("SubTitleManageUser") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <user-form
            @save="update"
            @remove="remove"
            :model="model"
            :isEditing="true" 
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
    this.$store.dispatch('getById', {
      entity: ENTITY.USER.SINGLE,
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
          entity: ENTITY.USER,
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
          entity: ENTITY.USER,
          id: id
        })
        .then(result => {
          this.$router.push({ name: 'UserList' })
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
