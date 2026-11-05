const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Gönderiliyor...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (response.ok && result.success) {
            alert("Mesajınız başarıyla iletildi!");
            form.reset();
        } else {
            alert("Hata: " + (result.message || "Form gönderilemedi."));
        }
    } catch (error) {
        alert("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});