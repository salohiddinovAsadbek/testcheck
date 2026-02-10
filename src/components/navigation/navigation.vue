<template>
  <div class="navigation">
    <router-link>
      <img :src="mainLogo1" alt="mainLogo" />
    </router-link>
    <div class="navigationWrapper">
      <button>
        <img :src="dashboard" alt="dashboard" />
        <p>{{ $t("homePage.dashboard") }}</p>
      </button>
    </div>
    <div class="support">
      <p>{{ $t("homePage.support") }}</p>
      <p>{{ $t("homePage.contact") }}</p>
      <button @click="contactPersonFunc">{{ $t("homePage.start") }}</button>
      <img :src="support1" alt="sad" />
      <img :src="support2" alt="asd" />
    </div>
    <button class="logout" @click="logoutFunc">
      <img :src="logout" alt="icon" />
      <p>{{ $t("homePage.logout") }}</p>
    </button>
  </div>
</template>
<script>
import dashboard from "./assets/dashboard.svg";
import mainLogo1 from "./assets/mainLogo.svg";
import logout from "./assets/logout.svg";
import support1 from "./assets/support1.svg";
import support2 from "./assets/support1.svg";

export default {
  data() {
    return {
      dashboard,
      mainLogo1,
      logout,
      support1,
      support2,
    };
  },
  methods: {
    logoutFunc() {
      this.$router.push("/");
      localStorage.clear();
    },
    contactPersonFunc() {
      window.location.href = "https://t.me/Ibrohim9596man";
    },
  },
};
</script>
<style></style>
