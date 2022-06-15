<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Edit") }} <b>{{ $resources("Privilege") }}</b></h2>
              <p>{{ $resources("SubTitleEditPrivilege") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <privilege-form
            @save="update"
            @remove="remove"
            :model="model"
            :isEditing="true" 
            >
          </privilege-form>
        </div>
    </div>
  </div>
</template>


<script>
import PrivilegeForm from './_PrivilegeForm'
import { ENTITY } from '@/config'

export default {
  created () {
    if (!this.model.name) {
      this.$store.dispatch('getById', {
        entity: ENTITY.PRIVILEGE.SINGLE,
        id: this.$route.params['id']
      })
    }
  },
  data () {
    return {}
  },
  computed: {
    model () {
      const privilegeById = this.$store.getters.getById(
        this.$route.params['id'],
        ENTITY.PRIVILEGE
      )
      return Object.assign({}, privilegeById)
    }
  },
  methods: {
    update (model) {
      this.$store
        .dispatch('update', {
          entity: ENTITY.PRIVILEGE,
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
          entity: ENTITY.PRIVILEGE,
          id: id
        })
        .then(result => {
          this.$router.push({ name: 'PrivilegeList' })
        })
        .catch(error => {
          console.log('error: ', error)
        })
    }
  },
  components: {
    privilegeForm: PrivilegeForm
  }
}
</script>
