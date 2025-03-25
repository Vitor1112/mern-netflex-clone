export function formatDate(dateString) {
	// Criar um objeto Date a partir da string de data de entrada
	const date = new Date(dateString);

	// Nomes dos meses em português
	const monthNames = [
		"Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 
		"Jul", "Ago", "Set", "Out", "Nov", "Dez"
	];

	// Extrair o mês, dia e ano do objeto Date
	const month = monthNames[date.getUTCMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();

	// Retornar a data formatada
	return `${day} de ${month} de ${year}`;
}

// Exemplo de uso
console.log(formatDate("2024-03-24")); // Saída: "24 de Mar de 2024"
