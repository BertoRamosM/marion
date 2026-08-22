export const SITE_URL = "https://www.westfrench-academy.com";

/*
 * Public booking link for the 15-minute discovery call.
 *
 * Empty on purpose until the Cal.com event exists. Everything that depends on
 * it checks for a non-empty string first, so while this is "" the site behaves
 * exactly as it did before: no booking buttons render, nothing links nowhere.
 * Paste the URL here and the buttons appear in both places at once —
 * the contact section and the "how do I sign up" answer on the FAQ.
 *
 * It books a CALL, not a class. That is the whole reason this is safe to
 * automate: the groups are small and level-dependent, so Marion still places
 * people by hand afterwards. The call is where the level gets discussed, which
 * is what the FAQ already tells visitors.
 *
 * Expected shape: https://cal.com/<handle>/appel-decouverte
 */
export const BOOKING_URL = "";
