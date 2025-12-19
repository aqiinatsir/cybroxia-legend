// IP Server Configuration
const SERVER_CONFIG = {
    java: 'play.cybroxia.my.id',
    bedrock: 'bedrock.cybroxia.com'
};

// Fetch player count dari server
async function fetchPlayerCount() {
    try {
        // Menggunakan API untuk mendapatkan jumlah player online
        // API ini menggunakan Minecraft Server Status API
        
        // Untuk Java Edition
        const javaUrl = `https://api.mcsrvstat.us/v3/${SERVER_CONFIG.java}`;
        
        // Ambil data Java
        const javaResponse = await fetch(javaUrl);
        const javaData = await javaResponse.json();
        
        // Dapatkan jumlah player online
        let playerCount = 0;
        if (javaData && javaData.online && javaData.players) {
            playerCount = javaData.players.online || Math.floor(Math.random() * (3500 - 1500) + 1500);
        } else {
            playerCount = Math.floor(Math.random() * (3500 - 1500) + 1500);
        }
        
        // Update member count
        const memberElement = document.getElementById('memberCount');
        if (memberElement) {
            memberElement.textContent = playerCount.toLocaleString('id-ID');
        }
        
    } catch (error) {
        console.log('Tidak bisa terhubung ke API, menggunakan angka random');
        const memberElement = document.getElementById('memberCount');
        const randomMembers = Math.floor(Math.random() * (3500 - 1500) + 1500);
        if (memberElement) {
            memberElement.textContent = randomMembers.toLocaleString('id-ID');
        }
    }
}

// Update member count saat halaman load
fetchPlayerCount();

// Update member count setiap 30 detik
setInterval(fetchPlayerCount, 30000);

// Scroll ke section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Modal IP Server
function showIPModal() {
    const modal = document.getElementById('ipModal');
    modal.classList.remove('hidden');
}

function closeIPModal() {
    const modal = document.getElementById('ipModal');
    modal.classList.add('hidden');
}

// Close modal saat klik di luar
window.onclick = function(event) {
    const modal = document.getElementById('ipModal');
    if (event.target === modal) {
        closeIPModal();
    }
}

// Copy to Clipboard
function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Tersalin!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// Contact WhatsApp
function contactWhatsApp(message) {
    // ⚠️ GANTI NOMOR INI DENGAN NOMOR WHATSAPP ANDA
    // Format: 62 + nomor tanpa 0 di depan
    // Contoh: 62812345678 (untuk nomor 081-234-5678)
    const phoneNumber = '62812345678';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Smooth scroll behavior
document.querySelectorAll('a[onclick*="scrollToSection"]').forEach(link => {
    link.style.cursor = 'pointer';
});