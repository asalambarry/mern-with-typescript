export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleString("fr-FR", {
	  year: "numeric",
	  month: "short", // 'long' pour le nom complet du mois en français
	  day: "numeric",
	  hour: "numeric",
	  minute: "numeric",
	  hour12: false // Utiliser le format 24h, plus courant en France
	});
  }
