<template>
<!-- Sidebar component with st-effect-1 (set on the toggle button within the navbar) -->
<aside class="sidebar left sidebar-size-3 sidebar-offset-1 sidebar-skin-white sidebar-visible-desktop" id=sidebar-filter>
  <div data-scrollable>
    <div class="sidebar-block equal-padding">
      <div class="form-group input-group">
        <input type="text" class="form-control" placeholder="Search">
        <span class="input-group-btn">
  				<button class="btn btn-primary" type="button"><i class="fas fa-search"></i></button>
  			</span>
      </div>
    </div>
    <div class="category">Summary</div>
    <div class="sidebar-block">
      <ul class="list-group list-group-menu">
        <li class="list-group-item"><a href="#"><span class="badge pull-right">120+</span> Sub Menu</a></li>
        <li class="list-group-item active"><a href="#"><span class="badge pull-right">30+</span> New York</a></li>
        <li class="list-group-item"><a href="#"><span class="badge pull-right">40+</span> Chicago</a></li>
        <li class="list-group-item"><a href="#"><span class="badge pull-right">60+</span> Tennessee</a></li>
        <li class="list-group-item"><a href="#"><span class="badge pull-right">120+</span> Miami</a></li>
        <li class="list-group-item"><a href="#"><span class="badge pull-right">30+</span> New York</a></li>
        <li class="list-group-item"><a href="#"><span class="badge pull-right">40+</span> Chicago</a></li>
        <li class="list-group-item"><a href="#"><span class="badge pull-right">60+</span> Tennessee</a></li>
      </ul>
      </div>
    </div>
    </div>
  </div>
</aside>
</template>

<script>
require('../../assets/js/app/_scrollable')
export default {
  name: 'SidebarFilter',
  mounted: function () {
    $('[data-scrollable]').tkScrollable()
  }
}
</script>
