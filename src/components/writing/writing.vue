<template>
  <div class="writing">
    <textarea v-model="writingData" @keydown.enter="sendWriting"></textarea>
    <button @click="sendWriting">Send</button>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      writingData: "",
    };
  },
  methods: {
    async sendWriting() {
      if (this.writingData === "") return false;
      let userInfo = JSON.parse(localStorage.getItem("user"));
      const botToken = "8072274181:AAHTuosNIN4WIzh9YVsceUl0dJpnR0VWQPI";
      const chatId = "6244316872";

      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: `
<b>New Message 🚀</b>

👤 <b>User:</b> ${userInfo.useremail}
💬 <b>Text:</b>
${this.writingData}
    `,
        parse_mode: "HTML",
      });

      this.writingData = "";
    },
  },
};
</script>
<style scoped>
.writing textarea {
  width: calc(400 / 14.4 * 1vw);
  height: calc(400 / 14.4 * 1vw);
}
</style>
