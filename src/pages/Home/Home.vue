<template>
  <div class="home">
    <router-view></router-view>
    <Navigation />
    <button @click="startVoice">Start</button>
    <button @click="stopVoice">Stop</button>
    <button @click="sendVoice">Send</button>
  </div>
</template>
<script>
import Navigation from "../../components/navigation/navigation.vue";
export default {
  components: {
    Navigation,
  },
  data() {
    return {
      mediaRecorder: null,
      audioChunks: [],
      audioUrl: null,
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    if (!user?.useremail || !user?.userpassword) {
      this.$router.push("/");
    }
  },
  methods: {
    async startVoice() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/webm" });
        this.audioUrl = URL.createObjectURL(audioBlob);
        this.audioChunks = [];
      };

      this.mediaRecorder.start();
    },

    stopVoice() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
      }
    },

    sendVoice() {
      const axios = require("axios");
      const fs = require("fs");
      const FormData = require("form-data");

      const token = "";
      const chatId = "";

      async function sendVoice() {
        const form = new FormData();
        form.append("chat_id", chatId);
        form.append("voice", fs.createReadStream("./voice.ogg")); // your voice file

        await axios.post(
          `https://api.telegram.org/bot${token}/sendVoice`,
          form,
          { headers: form.getHeaders() },
        );

        console.log("Voice sent ✅");
      }

      sendVoice();
    },
  },
};
</script>
<style></style>
