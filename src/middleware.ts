// import { sequence } from "astro:middleware";
// import { middleware } from "astro-i18next";

// export const onRequest = sequence(middleware);

// Pas de middleware pour l'instant
export const onRequest = async (
	_context: unknown,
	next: () => Promise<Response>,
): Promise<Response> => next()
