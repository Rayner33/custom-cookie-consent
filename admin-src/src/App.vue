<template>
  <div id="ccc-admin-app">
    <h1>Custom Cookie Consent</h1>
    <div class="nav-tab-wrapper">
      <a
        :class="{ 'nav-tab': true, 'nav-tab-active': activeTab === 'cookie-banner' }"
        @click="activeTab = 'cookie-banner'"
      >
        Cookie Banner
      </a>
      <a
        :class="{ 'nav-tab': true, 'nav-tab-active': activeTab === 'cookie-manager' }"
        @click="activeTab = 'cookie-manager'"
      >
        Cookie Manager
      </a>
      <a
        :class="{ 'nav-tab': true, 'nav-tab-active': activeTab === 'languages' }"
        @click="activeTab = 'languages'"
      >
        Languages
      </a>
    </div>
    <div class="ccc-tab-content">
      <CookieBanner v-if="activeTab === 'cookie-banner'" />
      <CookieManager v-if="activeTab === 'cookie-manager'" />
      <Languages v-if="activeTab === 'languages'" />
    </div>
  </div>
</template>

<script>
import CookieBanner from './components/CookieBanner.vue';
import CookieManager from './components/CookieManager.vue';
import Languages from './components/Languages.vue';

export default {
  components: {
    CookieBanner,
    CookieManager,
    Languages
  },
  data() {
    return {
      activeTab: 'cookie-banner'
    };
  }
};
</script>

<style>
#ccc-admin-app {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.nav-tab-wrapper {
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.nav-tab {
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: -1px;
  border: 1px solid transparent;
  border-bottom: none;
  background: #f1f1f1;
  color: #555;
  text-decoration: none;
  cursor: pointer;
}

.nav-tab:hover {
  background: #e5e5e5;
}

.nav-tab-active {
  background: #fff;
  border-color: #ddd;
  border-bottom: 2px solid #0073aa;
  color: #0073aa;
  font-weight: bold;
}

.ccc-tab-content {
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>