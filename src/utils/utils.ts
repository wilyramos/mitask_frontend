export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    
    const formatter = new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    return formatter.format(date);
}
