  <template>
  <div class="contents">
    <div class="white-box">
      <div class="content-title">
        <div class="row">
          <div class="col-xs-5">
            <h2>{{ $resources("List") }} <b> {{ $resources("Location") }} </b> </h2>
            <p>{{ $resources("SubTitleManageLocations") }}</p>
          </div>
          <div class="add-button col-xs-7 text-right">
            <button @click="reloadTable()" class="btn btn-primary"><i class="fas fa-sync"></i> <span> {{ $resources("Reload") }}</span></button>
            <button @click="gotoAdd()" class="btn btn-primary"><i class="fas fa-edit"></i> <span> {{ $resources("Add") }}</span></button>
          </div>
        </div>
      </div>
      <div class="table-filter">
        <div class="row">
          <datatable-perpage v-model="perPage"></datatable-perpage>
          <datatable-search v-model="search"></datatable-search>
        </div>
      </div>
      <datatable
        ref="table"
        :columns="columns"
        :actions="actions"
        :search="search"
        :per-page="perPage"
        :server-side="true"
        :responsive="true"
        :ajax="ajax"
      ></datatable>
    </div>
    
    <uiv-modal v-model="deleteModal" :title="$resources('DeleteConfirmation')">
      <span><b>{{ $resources("Msg_DeleteConfirmation", $resources("Location"), name) }}</b></span>
      <div slot="footer">
        <uiv-btn @click="deleteModal=false">{{ $resources("Cancel") }}</uiv-btn>
        <uiv-btn type="danger" @click="deleteAction()">{{ $resources("Remove") }}</uiv-btn>
      </div>
    </uiv-modal>
  </div>
</template>

<script>
import { ENTITY } from '@/config'

export default {
  data () {
    return {
      deleteModal: false,
      name: '',
      entity: '',
      search: '',
      perPage: 10,
      columns: [
        { name: 'id', data: 'id', title: '#', width: '10%' },
        { name: 'location_type_id', data: 'location_type_id', title: this.$resources('LocationType') },
        { name: 'name', data: 'name', title: this.$resources('Name') },
        { name: 'address_line_1', data: 'address_line_1', title: this.$resources('AddressLine1') },
        // { name: 'village_id', data: 'village_id', title: this.$resources('Village') },
        { name: 'district_id', data: 'district_id', title: this.$resources('District') },
        { name: 'regency_id', data: 'regency_id', title: this.$resources('Regency') },
        { name: 'province_id', data: 'province_id', title: this.$resources('Province') },
        // { name: 'description', data: 'description', title: this.$resources('Description') },
        { name: 'status', data: 'status_id', title: this.$resources('Status') },
        {
          name: '__actions',
          title: 'Actions',
          width: '10%',
          titleClass: 'text-center'
        }
      ],
      actions: [
        {
          title: 'Edit',
          icon: 'glyphicon glyphicon-pencil',
          class: 'btn btn-default btn-xs',
          click: [this, 'editAction'],
          button: true
        },
        {
          title: 'Delete',
          icon: 'glyphicon glyphicon-trash',
          class: 'btn btn-default btn-xs',
          click: [this, 'deleteConfirm'],
          button: true
        }
      ],

      ajax: function (data, callback, settings) {
        // prevent misterious double ajax calls
        // if (this.$store.state.showLoader) return
        var params = {
          filter: data.search.value,
          sorting: {
            [data.columns[data.order[0].column].data]: data.order[0].dir
          },
          count: data.length,
          start: data.start
        }

        this.$store
          .dispatch('search', {
            entity: ENTITY.LOCATION,
            params: params
          })
          .then(result => {
            var p = {
              recordsTotal: result.model.total_items,
              recordsFiltered: result.model.total_items,
              data: result.model.items
            }
            callback(p)
          })
          .catch(error => {
            console.log('error: ', error)
          })
      }
    }
  },
  created () {},

  computed: {},

  methods: {
    /**
     * Column view action.
     */
    // viewAction (user) {
    //   console.log('viewAction', user)
    // },

    /**
     * Column edit action.
     */
    editAction (user) {
      this.$router.push({ name: 'EditLocation', params: { id: user.id } })
    },

    /**
     * Column confirm delete action.
     */
    deleteConfirm (entity) {
      this.$data.deleteModal = true
      this.$data.entity = entity.entity
      this.$data.name = entity.name
      this.$data.deleteId = entity.id
    },

    /**
     * Column delete action.
     */
    deleteAction (id) {
      this.$data.deleteModal = false
      this.$store
        .dispatch('remove', {
          entity: ENTITY.LOCATION,
          id: this.$data.deleteId
        })
        .then(result => {
          this.$refs.table.draw()
        })
        .catch(error => {
          console.log('error: ', error)
        })
    },

    gotoAdd () {
      this.$router.push({ name: 'AddLocation' })
    },

    reloadTable () {
      this.$refs.table.draw()
    }
  }
}
</script>

<style>

</style>