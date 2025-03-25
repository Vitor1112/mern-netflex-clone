export function formatReleaseDate(date) {
	if (!date) return "Data desconhecida"; // Evita erro se a data for indefinida
	return new Date(date).toLocaleDateString("pt-BR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}
