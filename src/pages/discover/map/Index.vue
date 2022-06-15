<template>
<div class="contrainer-fluid">
  <div id="google-fs-realestate" class="maps-google-fs" style="overflow: hidden;">
    <gmap-map
      :center="center" 
      :zoom="zoom" map-type-id="roadmap" :options="{mapTypeControl: false, streetViewControl: false, fullscreenControl: false, styles: $appOption('mapStyle'), scrollwheel: scrollwheel}" @rightclick="mapRclicked" @drag="drag++" @click="mapClickedCount++" class="map-panel" @zoom_changed="update('zoom', $event)" @center_changed="update('reportedCenter', $event)"
      @maptypeid_changed="update('mapType', $event)" @bounds_changed="update('bounds', $event)">
      <gmap-cluster :grid-size="gridSize" v-if="clustering">
        <gmap-marker :icon="m.icon" v-if="m.enabled" :position="m.position" :opacity="m.opacity" :draggable="m.draggable" @click="m.clicked++" @rightclick="m.rightClicked++" @dragend="m.dragended++" @position_changed="updateChild(m, 'position', $event)" v-for="m in activeMarkers"
        :key="m.id">
        <gmap-info-window :opened="m.ifw">{{m.ifw2text}}</gmap-info-window>
        </gmap-marker>
      </gmap-cluster>
      <div v-if="!clustering">
        <gmap-marker :icon="m.icon"  v-if="m.enabled" :position="m.position" :opacity="m.opacity" :draggable="m.draggable" @click="m.clicked++" @rightclick="m.rightClicked++" @dragend="m.dragended++" @position_changed="updateChild(m, 'position', $event)" v-for="m in activeMarkers"
        :key="m.id">
        <gmap-info-window :opened="m.ifw">{{m.ifw2text}}</gmap-info-window>
        </gmap-marker>
      </div>
      <!-- <gmap-info-window :position="reportedCenter" :opened="ifw">
        To show you the bindings are working I will stay on the center of the screen whatever you do :)
        <br/> To show you that even my content is bound to vue here is the number of time you clicked on the map
        <b>{{mapClickedCount}}</b>
      </gmap-info-window> -->
      <!-- <gmap-info-window :position="reportedCenter" :opened="ifw2">{{ifw2text}}</gmap-info-window> -->
      </gmap-map>
  </div>
  <nav class="navbar navbar-default navbar-static-top navbar-absolute-top navbar-map-overlay">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="toggle pull-right margin-none visible-xs" data-toggle="collapse" href="#navbar"><i class="fa fa-sliders fa-rotate-90"></i></a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-left-m">

          <li><a href="listing.html"><i class="fa fa-list fa-fw"></i> List</a></li>
          <li><a href="listing-grid.html"><i class="fa fa-th fa-fw"></i> Grid</a></li>
          <li class="active"><a href="listing-map.html"><i class="fa fa-map-marker fa-fw"></i> Map</a></li>

        </ul>
        <div class="navbar-right">
          <div class="navbar-text">Sort by:</div>
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  Date Added <span class="caret"></span>
                  <span class="sr-only">(current)</span>
              </a>
              <ul class="dropdown-menu">
                <li class="active"><a href="#">Latest</a></li>
                <li><a href="#">Oldest</a></li>
                <li><a href="#">Price - ASC</a></li>
                <li><a href="#">Price - DESC</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <!-- <uiv-breadcrumbs :items="breadcrumbs"/> -->
  <!-- <router-view></router-view> -->
</div>
</template>

<script>
// const _ = require('lodash')
export default {
  data () {
    return {
      lastId: 1,
      center: {
        lat: -7.762500299999999,
        lng: 110.38972650000005
      },
      reportedCenter: {
        lat: -7.762500299999999,
        lng: 110.38972650000005
      },
      mapBounds: {},
      clustering: true,
      zoom: 13,
      gridSize: 50,
      mapType: 'roadmap',
      markers: [],
      drag: 0,
      mapClickedCount: 0,
      ifw: true,
      ifw2: false,
      ifw2text: 'You can also use the content prop to set your modal',
      mapStyle: 'light-grey',
      scrollwheel: true
    }
  },
  created () {
    var vm = this
    var geoSuccess = function (position) {
      vm.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
      var icons = {
        parking: {
          icon: iconBase + 'parking_lot_maps.png'
        },
        library: {
          icon: iconBase + 'library_maps.png'
        },
        info: {
          icon: iconBase + 'info-i_maps.png'
        }
      }
      vm.markers.push({
        id: vm.lastId,
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        opacity: 1,
        draggable: false,
        enabled: true,
        clicked: 0,
        rightClicked: 0,
        dragended: 0,
        ifw: false,
        ifw2text: 'Lokasi Anda',
        icon: icons['info'].icon
      })
    }
    var geoError = function (error) {
      console.log('Error occurred. Error code: ' + error.code)
    }
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
  },
  methods: {
    mapClicked (mouseArgs) {
      console.log('map clicked', mouseArgs) // eslint-disable-line no-console
    },
    mapRclicked (mouseArgs) {
      const createdMarker = this.addMarker()
      createdMarker.position.lat = mouseArgs.latLng.lat()
      createdMarker.position.lng = mouseArgs.latLng.lng()
    },
    update (field, event) {
      if (field === 'reportedCenter') {
        // N.B. It is dangerous to update this.center
        // Because the center reported by Google Maps is not exactly
        // the same as the center you pass it.
        // Instead we update this.center only when the input field is changed.

        this.reportedCenter = {
          lat: event.lat(),
          lng: event.lng()
        }

        // If you wish to test the problem out for yourself, uncomment the following
        // and see how your browser begins to hang:
        // this.center = _.clone(this.reportedCenter)
      } else if (field === 'bounds') {
        this.mapBounds = event
      } else {
        this.$set(this, field, event)
      }
    },

    updateChild (object, field, event) {
      if (field === 'position') {
        object.position = {
          lat: event.lat(),
          lng: event.lng()
        }
      }
    }
  },
  computed: {
    activeMarkers () {
      return this.markers
    }
  }
}
</script>

<style scoped>
  .vue-map-container {
      position: initial;
  }
</style>
