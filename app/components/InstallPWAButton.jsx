import React, { useEffect, useState } from 'react';

const InstallPWAButton = () => {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default browser prompt from appearing immediately
      e.preventDefault();
      // Store the event so it can be triggered later
      setInstallPrompt(e);
    };

    // Listen for the event when the component mounts
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) {
      return;
    }
    // Show the browser's native installation prompt
    installPrompt.prompt();

    // Optional: Log the user's choice
    installPrompt.userChoice.then((choiceResult) => {
      console.log('User choice:', choiceResult.outcome);
      // Clear the prompt event once used
      setInstallPrompt(null);
    });
  };

  Only render the button if the PWA can be installed
  if (!installPrompt) {
    return null;
  }

  return (
    <button onClick={handleInstallClick} className=" mx-2 bg-blue-500 hover:bg-blue-700 text-white text-xs font-semibold py-1 px-2 rounded"   >
      Add to Home Screen
    </button>
  );
};

export default InstallPWAButton;