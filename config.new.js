window.config = {
    googleClientId: '639078981362-kjo7me0u11aiokta3av0c0varjv691p8.apps.googleusercontent.com',
};

// Initialize Google Sign In
window.onload = function() {
    google.accounts.id.initialize({
        client_id: window.config.googleClientId,
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large" }
    );
};
