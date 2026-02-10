<template>
  <div class="home">
    <router-view></router-view>
    <Navigation />
    <button @click="startVoice">Start</button>
    <button @click="stopVoice">Stop</button>
    <button @click="downloadAudio" v-if="audioUrl">Send</button>
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
      stream: null, // qo'shamiz
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

      this.stream = stream; // stream ni saqlab qo'yamiz

      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/webm" });
        this.audioUrl = URL.createObjectURL(audioBlob);
        this.audioChunks = [];

        // Stream trackларini to'xtatamiz
        this.stream.getTracks().forEach((track) => track.stop());
      };

      this.mediaRecorder.start();
    },

    stopVoice() {
      if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
        this.mediaRecorder.stop();
      }
    },

    downloadAudio() {
      if (this.audioUrl) {
        const a = document.createElement("a");
        a.href = this.audioUrl;
        a.download = `recording-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    },
  },
};
</script>
<style></style>
