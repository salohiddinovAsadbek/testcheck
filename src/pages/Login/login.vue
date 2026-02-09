<template>
  <router-view></router-view>
  <div class="loginPage">
    <div class="quote">
      <div>
        <img :src="quote" alt="" />
        <p>{{ $t("quote") }}</p>
        <p>{{ $t("quoteAuthor") }}</p>
        <img :src="quoteBottom" alt="" />
      </div>
    </div>
    <div class="loginPageForm">
      <router-link to="/">
        <img :src="mainLogo" alt="mainLogo" />
      </router-link>
      <div class="loginPageFormInfo">
        <p>{{ $t("loginPage.first") }}</p>
        <p>{{ $t("loginPage.second") }}</p>
        <form>
          <label>
            <p>{{ $t("loginPage.third") }}</p>
            <input
              type="text"
              :placeholder="$t('loginPage.fourth')"
              v-model="userInfo.useremail"
              @keyup.enter="submitForm"
            />
          </label>
          <label>
            <p>{{ $t("loginPage.fifth") }}</p>
            <input
              :type="isShowPasswordValue ? 'text' : 'password'"
              :placeholder="$t('loginPage.sixth')"
              v-model="userInfo.userpassword"
              @keyup.enter="submitForm"
            />
            <button type="button" @click="isShowPassword">
              {{
                isShowPasswordValue
                  ? $t("loginPage.hide")
                  : $t("loginPage.seventh")
              }}
            </button>
          </label>
          <div @click="rememberMeFunc">
            <input type="checkbox" v-model="rememberMe" />
            <p>{{ $t("loginPage.eighth") }}</p>
          </div>
        </form>
        <button class="loginSubmit" @click="submitForm">
          <p>{{ $t("loginPage.ninth") }}</p>
        </button>
        <div class="loginOr">
          <p></p>
          <span>{{ $t("loginPage.or") }}</span>
          <p></p>
        </div>
        <button class="loginWith">
          <p>{{ $t("loginPage.tenth") }}</p>
        </button>
        <p class="loginForgot">{{ $t("loginPage.eleventh") }}</p>
      </div>
    </div>
    <div class="language">
      <select v-model="currentLang" @change="changeLang">
        <option value="en">🇺🇸</option>
        <option value="uz">🇺🇿</option>
      </select>
    </div>
  </div>
</template>
<script>
import mainLogo from "./assets/mainLogo.svg";
import quote from "./assets/quote.svg";
import quoteBottom from "./assets/quoteBottom.svg";
import { toast } from "vue3-toastify";
export default {
  data() {
    return {
      mainLogo,
      quote,
      quoteBottom,
      userInfo: {
        useremail: "",
        userpassword: "",
      },
      isShowPasswordValue: false,
      rememberMe: false,
      currentLang: "en",
    };
  },
  methods: {
    checkValidity() {
      if (!this.userInfo.useremail.includes("@")) {
        return false;
      }

      if (!this.userInfo.userpassword.length > 0) {
        return false;
      }

      return true;
    },

    isShowPassword() {
      this.isShowPasswordValue = !this.isShowPasswordValue;
    },

    rememberMeFunc() {
      this.rememberMe = !this.rememberMe;
      console.log(this.rememberMe);
    },

    submitForm() {
      if (this.checkValidity()) {
        this.users.map((user) => {
          if (
            user.useremail === this.userInfo.useremail &&
            user.userpassword === this.userInfo.userpassword
          ) {
            console.log("succes");
            this.$router.push("/home");
          }
        });
      }

      if (!this.checkValidity()) {
        if (this.userInfo.useremail === "") {
          toast("Please write email", {
            type: "warning",
            dangerouslyHTMLString: true,
          });
        }

        if (this.userInfo.userpassword === "") {
          toast("Please write password", {
            type: "warning",
            dangerouslyHTMLString: true,
          });
        }
      }

      this.userInfo.useremail = "";
      this.userInfo.userpassword = "";
    },
    changeLang() {
      this.$i18n.locale = this.currentLang;
      console.log(this.currentLang);
    },
  },
  props: ["users"],
};
</script>
<style></style>
