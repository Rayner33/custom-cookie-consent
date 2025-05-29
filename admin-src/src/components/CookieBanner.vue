<template>
  <div class="cookie-banner-settings">
    <h2>Cookie Banner</h2>
    <div class="settings-container">
      <!-- Boczne menu -->
      <div class="settings-sidebar">
        <ul class="settings-nav">
          <li
            :class="{ 'nav-item': true, 'nav-item-active': activeSubTab === 'layout' }"
            @click="activeSubTab = 'layout'"
          >
            Layout
          </li>
          <li
            :class="{ 'nav-item': true, 'nav-item-active': activeSubTab === 'content-colors' }"
            @click="activeSubTab = 'content-colors'"
          >
            Content & Colors
          </li>
        </ul>
      </div>
      <!-- Obszar treści -->
      <div class="settings-content">
        <div class="content-header">
          <button class="button button-save" @click="saveSettings">Save Changes</button>
        </div>
        <div class="content-body">
          <div v-if="activeSubTab === 'layout'">
            <h3>Layout</h3>
            <div class="form-group">
              <label>Cookie Notice Type</label>
              <div class="notice-types">
                <div
                  class="notice-type"
                  :class="{ 'notice-type-selected': settings.banner_type === 'box' }"
                  @click="selectBannerType('box')"
                >
                  <div class="icon-box">Box</div>
                  <p>Box style notice, placed in a corner.</p>
                </div>
                <div
                  class="notice-type"
                  :class="{ 'notice-type-selected': settings.banner_type === 'banner' }"
                  @click="selectBannerType('banner')"
                >
                  <div class="icon-banner">Banner</div>
                  <p>Full-width banner at the top or bottom.</p>
                </div>
                <div
                  class="notice-type"
                  :class="{ 'notice-type-selected': settings.banner_type === 'popup' }"
                  @click="selectBannerType('popup')"
                >
                  <div class="icon-popup">Popup</div>
                  <p>Centered popup notice.</p>
                </div>
              </div>
            </div>
            <div class="form-group" v-if="settings.banner_type === 'box'">
              <label>Position</label>
              <select v-model="settings.banner_position">
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>
            <div class="form-group" v-if="settings.banner_type === 'banner'">
              <label>Position</label>
              <select v-model="settings.banner_position">
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
            <div class="form-group" v-if="settings.banner_type === 'popup'">
              <p>Popup will be centered on the screen.</p>
            </div>
          </div>
          <div v-if="activeSubTab === 'content-colors'">
            <h3>Content & Colors</h3>
            <!-- Treść banera -->
            <div class="form-group">
              <label>Banner Title</label>
              <input type="text" v-model="settings.banner_title" placeholder="e.g., Używamy ciasteczek" class="input-wide">
            </div>
            <div class="form-group">
              <label>Banner Message</label>
              <textarea v-model="settings.banner_message" placeholder="e.g., Nasza strona używa ciasteczek, aby poprawić Twoje doświadczenie." class="textarea-wide"></textarea>
            </div>
            <!-- Style kolorystyczne -->
            <div class="form-group color-group">
              <div class="color-item">
                <label>Banner Background Color</label>
                <input type="color" v-model="settings.banner_background_color" class="color-picker">
              </div>
              <div class="color-item">
                <label>Text Color</label>
                <input type="color" v-model="settings.banner_text_color" class="color-picker">
              </div>
            </div>
            <!-- Separator -->
            <hr class="section-divider">
            <!-- Ustawienia przycisków banera -->
            <h4>Button Settings</h4>
            <div class="form-group">
              <label>Customize Button Text</label>
              <input type="text" v-model="settings.customize_button_text" placeholder="e.g., Dostosuj" class="input-wide">
            </div>
            <div class="form-group color-group">
              <div class="color-item">
                <label>Customize Button Color</label>
                <input type="color" v-model="settings.customize_button_color" class="color-picker">
              </div>
            </div>
            <div class="form-group">
              <label>Reject Button Text</label>
              <input type="text" v-model="settings.reject_button_text" placeholder="e.g., Odrzuć" class="input-wide">
            </div>
            <div class="form-group color-group">
              <div class="color-item">
                <label>Reject Button Color</label>
                <input type="color" v-model="settings.reject_button_color" class="color-picker">
              </div>
            </div>
            <div class="form-group">
              <label>Accept Button Text</label>
              <input type="text" v-model="settings.accept_button_text" placeholder="e.g., Akceptuję Wszystkie" class="input-wide">
            </div>
            <div class="form-group color-group">
              <div class="color-item">
                <label>Accept Button Color</label>
                <input type="color" v-model="settings.accept_button_color" class="color-picker">
              </div>
            </div>
            <!-- Separator -->
            <hr class="section-divider">
            <!-- Ustawienia modala "Dostosuj" -->
            <h4>Customize Modal Settings</h4>
            <div class="form-group">
              <label>Modal Title</label>
              <input type="text" v-model="settings.customize_title" placeholder="e.g., Dostosuj ustawienia ciasteczek" class="input-wide">
            </div>
            <div class="form-group">
              <label>Modal Message</label>
              <textarea v-model="settings.customize_message" placeholder="e.g., Wybierz, które ciasteczka chcesz zaakceptować." class="textarea-wide"></textarea>
            </div>
            <div class="form-group">
              <label>Save Preferences Button Text</label>
              <input type="text" v-model="settings.save_preferences_text" placeholder="e.g., Zapisz moje preferencje" class="input-wide">
            </div>
            <div class="form-group color-group">
              <div class="color-item">
                <label>Save Preferences Button Color</label>
                <input type="color" v-model="settings.save_preferences_color" class="color-picker">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSubTab: 'layout',
      settings: {
        banner_type: 'box',
        banner_position: 'bottom-right',
        banner_title: '',
        banner_message: '',
        banner_background_color: '#ffffff', // Domyślny biały
        banner_text_color: '#000000', // Domyślny czarny
        customize_button_text: '',
        customize_button_color: '#0073aa', // Domyślny niebieski
        reject_button_text: '',
        reject_button_color: '#dc3545', // Domyślny czerwony
        accept_button_text: '',
        accept_button_color: '#28a745', // Domyślny zielony
        customize_title: '',
        customize_message: '',
        save_preferences_text: '',
        save_preferences_color: '#0073aa' // Domyślny niebieski
      }
    };
  },
  mounted() {
    this.fetchSettings();
  },
  methods: {
    fetchSettings() {
      console.log('cccAdmin:', window.cccAdmin);
      if (!window.cccAdmin || !window.cccAdmin.resturl || !window.cccAdmin.nonce) {
        console.error('Error: cccAdmin is not defined. Cannot fetch settings.');
        return;
      }
      console.log('REST URL:', window.cccAdmin.resturl);
      axios.get(window.cccAdmin.resturl, {
        headers: {
          'X-WP-Nonce': window.cccAdmin.nonce,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(response => {
        console.log('Dane zwrócone przez API:', response.data);
        this.settings = {
          banner_type: response.data.banner_type || 'box',
          banner_position: response.data.banner_position || 'bottom-right',
          banner_title: response.data.banner_title || '',
          banner_message: response.data.banner_message || '',
          banner_background_color: response.data.banner_background_color || this.settings.banner_background_color,
          banner_text_color: response.data.banner_text_color || this.settings.banner_text_color,
          customize_button_text: response.data.customize_button_text || '',
          customize_button_color: response.data.customize_button_color || this.settings.customize_button_color,
          reject_button_text: response.data.reject_button_text || '',
          reject_button_color: response.data.reject_button_color || this.settings.reject_button_color,
          accept_button_text: response.data.accept_button_text || '',
          accept_button_color: response.data.accept_button_color || this.settings.accept_button_color,
          customize_title: response.data.customize_title || '',
          customize_message: response.data.customize_message || '',
          save_preferences_text: response.data.save_preferences_text || '',
          save_preferences_color: response.data.save_preferences_color || this.settings.save_preferences_color
        };
      }).catch(error => {
        console.error('Error fetching settings:', error);
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Dane błędu:', error.response.data);
          console.error('Nagłówki odpowiedzi:', error.response.headers);
        } else if (error.request) {
          console.error('Brak odpowiedzi od serwera:', error.request);
        } else {
          console.error('Błąd konfiguracji żądania:', error.message);
        }
      });
    },
    saveSettings() {
      if (!window.cccAdmin || !window.cccAdmin.resturl || !window.cccAdmin.nonce) {
        console.error('Error: cccAdmin is not defined. Cannot save settings.');
        return;
      }
      console.log('Dane wysyłane do API:', this.settings);
      console.log('URL żądania:', window.cccAdmin.resturl);
      console.log('Nonce:', window.cccAdmin.nonce);
      axios.post(window.cccAdmin.resturl, this.settings, {
        headers: {
          'X-WP-Nonce': window.cccAdmin.nonce,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
        .then(response => {
          console.log('Odpowiedź serwera:', response);
          console.log('Settings saved:', response.data);
          alert('Settings saved successfully.');
          // Po zapisaniu ustawień odświeżamy je, aby upewnić się, że dane są poprawnie załadowane
          this.fetchSettings();
        })
        .catch(error => {
          console.error('Error saving settings:', error);
          if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Dane błędu:', error.response.data);
            console.error('Nagłówki odpowiedzi:', error.response.headers);
          } else if (error.request) {
            console.error('Brak odpowiedzi od serwera:', error.request);
          } else {
            console.error('Błąd konfiguracji żądania:', error.message);
          }
          alert('Error saving settings: ' + (error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Unknown error'));
        });
    },
    selectBannerType(type) {
      this.settings.banner_type = type;
      if (type === 'box' && !['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(this.settings.banner_position)) {
        this.settings.banner_position = 'bottom-right';
      } else if (type === 'banner' && !['top', 'bottom'].includes(this.settings.banner_position)) {
        this.settings.banner_position = 'bottom';
      } else if (type === 'popup') {
        this.settings.banner_position = 'center';
      }
    }
  }
};
</script>

<style scoped>
.cookie-banner-settings {
  padding: 20px;
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.settings-container {
  display: flex;
  gap: 20px;
}

/* Boczne menu */
.settings-sidebar {
  width: 200px;
  background: #f9f9f9;
  border-right: 1px solid #ddd;
  padding: 10px 0;
}

.settings-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  padding: 12px 20px;
  color: #555;
  cursor: pointer;
  font-size: 14px;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: #e5e5e5;
}

.nav-item-active {
  background: #fff;
  color: #0073aa;
  border-left: 3px solid #0073aa;
  font-weight: bold;
}

/* Obszar treści */
.settings-content {
  flex: 1;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
}

.content-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.button-save {
  background-color: #28a745;
  border-color: #28a745;
  color: #fff;
  padding: 8px 16px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  border: none;
}

.button-save:hover {
  background-color: #218838;
}

.content-body h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.content-body h4 {
  font-size: 16px;
  color: #333;
  margin: 20px 0 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.input-wide {
  width: 100%;
  max-width: 500px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.textarea-wide {
  width: 100%;
  max-width: 500px;
  height: 100px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
}

.color-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.color-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.color-picker {
  width: 50px;
  height: 30px;
  padding: 0;
  border: none;
  cursor: pointer;
}

.section-divider {
  border: 0;
  border-top: 1px solid #ddd;
  margin: 20px 0;
}

.notice-types {
  display: flex;
  gap: 20px;
}

.notice-type {
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  background: #f9f9f9;
  transition: all 0.2s ease;
}

.notice-type:hover {
  border-color: #0073aa;
  background: #f0f6fc;
}

.notice-type-selected {
  border-color: #0073aa;
  background: #e6f0fa;
  box-shadow: 0 0 0 1px #0073aa;
}

.icon-box,
.icon-banner,
.icon-popup {
  height: 60px;
  background: #ddd;
  margin-bottom: 10px;
  line-height: 60px;
  font-size: 16px;
  color: #555;
  border-radius: 4px;
}

.notice-type p {
  margin: 0;
  font-size: 13px;
  color: #666;
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
}
</style>