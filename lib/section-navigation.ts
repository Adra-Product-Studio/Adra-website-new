// The sheet owns its dismissal. Navigation starts only after its focus trap exits.
let pendingMenuNavigation: (() => void) | undefined;

export function queueMenuNavigation(navigate: () => void) {
  pendingMenuNavigation = navigate;
  return () => {
    if (pendingMenuNavigation === navigate) pendingMenuNavigation = undefined;
  };
}

export function completeMenuNavigation(event: Event) {
  if (!pendingMenuNavigation) return;
  event.preventDefault();
  const navigate = pendingMenuNavigation;
  pendingMenuNavigation = undefined;
  // Allow the dialog's scroll lock to release before measuring the destination.
  requestAnimationFrame(navigate);
}
