const rsvpForm = document.querySelector("[data-rsvp]");
const rsvpNote = document.querySelector("[data-rsvp-note]");

if (rsvpForm && rsvpNote) {
  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = rsvpForm.querySelector("input[name='name']");
    const from = rsvpForm.querySelector("input[name='from']");
    if (!name || !from || !name.value.trim() || !from.value.trim()) return;
    rsvpNote.hidden = false;
  });
}
