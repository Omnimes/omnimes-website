import fs from 'fs/promises'; 
import { OstDocument } from 'outstatic';
export const generateSearchJSON = async (posts: OstDocument[]) => {
    try {
        await fs.writeFile('public/images/search.json', JSON.stringify(posts, null, 2), 'utf-8');
    } catch (error) {
        console.error('Błąd podczas zapisu pliku search.json:', error);
    }
}