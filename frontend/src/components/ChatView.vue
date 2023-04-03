<template>
    <div class="page-container">
        <md-app>
            <md-app-toolbar class="md-primary">
                <div class="md-toolbar-row">
                    <span class="md-title">채팅 예제</span>
                </div>
            </md-app-toolbar>
            <md-app-content>
                <md-field>
                    
                    <md-textarea v-model="textarea" disabled v-auto-scroll-bottom></md-textarea>
                </md-field>
                <md-field>
                    <label>여기에 메시지를 입력하세요</label>
                    <md-input v-model="message"></md-input>
                    <md-button class="md-primary md-raised" @click="sendMessage()">전송</md-button>
                </md-field>
            </md-app-content>
        </md-app>
    </div>
</template>


<script>
export default {
    name: 'ChatView',
    created() {
        this.$socket.on('chat', (data) => {
            this.textarea += data.message + "\n";
        })
    },
    data() {
        return {
            textarea: "",
            message: '',
        }
    },
    methods: {
        sendMessage() {

            this.$socket.emit('chat', {
                message: this.message
            });

            this.textarea += this.message + "\n";
            this.message = '';
        },
    }
}
</script>

<style>
.title {
    text-align: center;
}
.md-app {
    height: 800px;
    border: 1px solid rgba(#000, .12);
}

.md-textarea {
    height: 600px;
}
</style>
