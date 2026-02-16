<template>
  <div class="writing">
    <textarea
      v-model="writingData"
      @keydown.enter="sendWriting"
      placeholder="Please write your essay here...."
    >
      <p>Salom</p>
    </textarea>
    <button @click="sendWriting">Send</button>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  data() {
    return {
      writingData: "",
    };
  },
  methods: {
    async sendWriting() {
      console.log(this.writingData.split("").length);

      if (this.writingData.split("").length < 50) {
        toast("Please write at least 50 words", {
          type: "warning",
          dangerouslyHTMLString: true,
        });

        return false;
      }

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
.writing {
  display: flex;
  align-items: start;
  gap: calc(20 / 14.4 * 1vw);
}
.writing textarea {
  width: calc(400 / 14.4 * 1vw);
  height: 90vh;
  resize: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: calc(20 / 14.4 * 1vw);
}

button {
  height: calc(40 / 14.4 * 1vw);
  width: calc(60 / 14.4 * 1vw);
  background-color: #1935ca;
  color: white;
  border-radius: calc(10 / 14.4 * 1vw);
  border: none;
  cursor: pointer;
}
</style>
