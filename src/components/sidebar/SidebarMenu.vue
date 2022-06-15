<template>
  <aside class="sidebar left sidebar-size-1 sidebar-mini-reveal sidebar-offset-0 sidebar-skin-dark sidebar-visible-desktop"
    id=sidebar-menu data-type=collapse>
    <div data-scrollable>
      <ul  v-for="menu in menus" :key="menu.id" class="sidebar-menu sm-bordered sm-icons-block sm-icons-right">
        <li v-bind:id="'menu-'+menu.id" class="" v-bind:class="{ hasSubmenu: menu.children.length > 0, 'active': menu.active, 'open': menu.open }">
          <a v-bind:href="'#'+menu.id">
            <i v-bind:class="menu.fa" class="fa"></i>
            <span>{{ menu.name }}</span>
          </a>
          <ul v-bind:id="menu.id" v-bind:class="{'collapse in': menu.open }">
            <li v-for="child in menu.children" :key="child.path" v-bind:class="{'active': child.active }">
              <a v-bind:href="'#' + menu.path + '/' + child.path">
                <i v-bind:class="child.fa" class="fa"></i>
                <span>{{child.meta.title}}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
  require('@/assets/js/app/_scrollable')

  export default {
    name: 'SidebarMenu',
    mounted: function () {
      $('[data-scrollable]').tkScrollable()
    },
    computed: {
      menus () {
        return this.$store.getters.allMenus
      }
    },
    methods: {
      // setNavigation: function (parent, child) {
      //   this.$store.dispatch('setNavigation', { parent, child })
      // }
    }
  }
</script>

<style scoped>

.sidebar.sidebar-skin-dark .sidebar-menu li.hasSubmenu.active > a:before {
    color:#fff;
}

.sidebar-menu li.hasSubmenu > a:before {
    content: "+";
    letter-spacing: -3px;
}
.sidebar-menu li.hasSubmenu.open > a:before {
    content: "--";
    color:#fff;
    letter-spacing: -3px;
}
</style>