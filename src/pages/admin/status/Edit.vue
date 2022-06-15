<template>
  <div class="contents">
      <div class="white-box">
        <div class="content-title">
          <div class="row">
            <div class="col-sm-4">
              <h2>{{ $resources("Edit") }} <b>{{ $resources("Status") }}</b></h2>
              <p>{{ $resources("SubTitleManageStatus") }}</p>
            </div>
          </div>
        </div>
        <div class="row white-box-form">
          <status-form
            @save="update"
            @remove="remove"
            :model="model"
            :isEditing="true" 
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
    if (!this.model.name) {
      this.$store.dispatch('getById', {
        entity: ENTITY.STATUS.SINGLE,
        id: this.$route.params['id']
      })
    }
  },
  data () {
    return {}
  },
  computed: {
    model () {
      const statusById = this.$store.getters.getById(
        this.$route.params['id'],
        ENTITY.STATUS
      )
      return Object.assign({}, statusById)
    }
  },
  methods: {
    update (model) {
      this.$store
        .dispatch('update', {
          entity: ENTITY.STATUS,
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
          entity: ENTITY.STATUS,
          id: id
        })
        .then(result => {
          this.$router.push({ name: 'StatusList' })
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
