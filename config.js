window.config = {
    // TODO: Replace this with your actual Google OAuth 2.0 Client ID
    // To get a Client ID:
    // 1. Go to https://console.cloud.google.com
    // 2. Create a new project or select existing one
    // 3. Enable Google Sign-In API
    // 4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
    // 5. Set up OAuth consent screen if needed
    // 6. Create Web Application type credentials
    // 7. Add your domain to authorized origins
    // 8. Copy the generated Client ID and paste it here
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
