/// <reference types="office-js" />

Office.onReady(() => {
  // Commands initialization
  console.log('TISAP Mail Agent commands loaded');
});

// Function file for add-in commands
function action(event: Office.AddinCommands.Event) {
  event.completed();
}

// Register functions
(Office as any).actions.associate("action", action);
