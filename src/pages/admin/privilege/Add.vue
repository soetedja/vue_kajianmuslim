<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Add") }} <b>{{ $resources("Privilege") }}</b></h2>
              <p>{{ $resources("SubTitleCreatePrivilege") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <privilege-form
            @save="add"
            :model="model"
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
        console.log(model)
        this.$store.dispatch('add', {
          entity: ENTITY.PRIVILEGE,
          id: this.$route.params['id'],
          data: model
        }).then(result => {
          this.$router.push({name: 'PrivilegeList'})
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
